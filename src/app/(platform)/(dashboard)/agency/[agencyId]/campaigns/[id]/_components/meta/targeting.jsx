"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Earth, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { cn } from "@/lib/utils";
import { useFormInputs } from "@/hooks/use-inputs";

export function Targeting({ setShowTargetingForm }) {

  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverContent>
        <p className="font-semibold text-sm mb-2">Targeting</p>
        <p className="text-sm mb-1">Limit the reach of your post by selecting the countries in which you want it to be displayed.</p>
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
          onClick={() => setShowTargetingForm((curr) => !curr)}
          className="grid place-content-center p-4 rounded-full hover:bg-main-light"
        >
          <Earth className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}

Targeting.Form = function LocationForm({ form, message, setShowTargetingForm, showTargetingForm, accessToken }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [debounceTimeout, setDebounceTimeout] = useState(null)

  const { inputs: { selectedCountries }, setInputs } = useFormInputs((state) => state)

  function handleCancelTargeting() {
    setShowTargetingForm(false)
  }

  function handleSubmitTargeting() {
    setShowTargetingForm(false)

    const newTargetingObj = {
      geo_locations: {
        countries: selectedCountries.map((country) => country.key)
      }
    }
    form.setValue("targeting", newTargetingObj)
  }

  const handleSearch = async (value) => {
    if (value.length > 0) {

      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/search?type=adgeolocation&q=${value}&location_types=["country"]&access_token=${accessToken}`)
      const countries = await response.json()

      if (countries.data) {
        const { data } = countries
        setResults(data)
      } else {
        setResults([])
      }

    } else {
      setResults([])
    }
  }

  const handleInputChange = (value) => {
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 2000);

    setDebounceTimeout(timeoutId);
  };

  return (
    <>
      {showTargetingForm && (
        <div className="w-full space-y-2">
          <FormLabel className={cn(message && "text-destructive")}>Select countries</FormLabel>
          <Input
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter a country" />
          <FormMessage>
            {message ? message : ""}
          </FormMessage>
          <div className="flex items-center justify-start gap-x-1">
            {selectedCountries.map((country) => (
              <p className="flex items-center gap-x-1 p-2 bg-main-light rounded-md" key={country.key}>
                {country.name}
                <X className="size-4 cursor-pointer" onClick={() => {
                  setInputs("selectedCountries", selectedCountries.filter((item) => country.key !== item.key))
                }} />
              </p>
            ))}
          </div>
          <>
            {results?.length > 0 && (
              <ul className="absolute z-10 w-auto bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {results.map((result) => (
                  <li
                    key={result.key}
                    className="px-4 py-2 text-sm font-medium hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(result.name)
                      if(selectedCountries.includes({ key: result.key, name: result.name })) return 
                      setInputs("selectedCountries", [...selectedCountries, { key: result.key, name: result.name }])
                      setResults([])
                    }}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            )}
          </>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={handleCancelTargeting}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTargeting}
              disabled={!selectedCountries.length}
              type="button"
              variant="primary"
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  )
}