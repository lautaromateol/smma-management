"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { cn } from "@/lib/utils";

export function Location({ setShowLocationForm }) {

  const [showPopover, setShowPopover] = useState(false)

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverContent>
        <p className="font-semibold text-sm mb-2">Location</p>
        <p className="text-sm mb-1">Add a location to your post.</p>
      </PopoverContent>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          onMouseEnter={() => setShowPopover(true)}
          onMouseLeave={() => setShowPopover(false)}
          onClick={() => setShowLocationForm((curr) => !curr)}
          className="grid place-content-center p-4 rounded-full hover:bg-main-light"
        >
          <MapPin className="size-4" />
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}

Location.Form = function LocationForm({ form, message, locationValue, setLocationValue, setShowLocationForm, showLocationForm, accessToken }) {

  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState([])
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  function handleCancelLocation() {
    setShowLocationForm(false)
    setLocationValue(form.getValues().location)
  }

  function handleSubmitLocation() {
    setShowLocationForm(false)
    form.setValue("location", locationValue)
  }

  const handleSearch = async (value) => {
    if (value.length > 0) {

      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/search?type=adgeolocation&q=${value}&location_types=["city"]&access_token=${accessToken}`)
      const cities = await response.json()

      if (cities.data) {
        const { data } = cities
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
      {showLocationForm && (
        <div className="w-full space-y-2">
          <FormLabel className={cn(message && "text-destructive")}>Location</FormLabel>
          <Input
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter a location" />
          <FormMessage>
            {message ? message : ""}
          </FormMessage>
          <>
            {results?.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
                {results.map((result) => (
                  <li
                    key={result.key}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(result.name)
                      setLocationValue(result.key)
                      setResults([])
                    }}
                  >
                    {result.name}, {result.country_name}
                  </li>
                ))}
              </ul>
            )}
          </>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={handleCancelLocation}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitLocation}
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

// {
//   "data": [
//       {
//           "key": "84826",
//           "name": "Corrientes",
//           "type": "city",
//           "country_code": "AR",
//           "country_name": "Argentina",
//           "region": "Corrientes",
//           "region_id": 102,
//           "supports_region": true,
//           "supports_city": true
//       },
//   ],
// }