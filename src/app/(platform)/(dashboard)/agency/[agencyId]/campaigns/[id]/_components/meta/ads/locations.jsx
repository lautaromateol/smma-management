import { useEffect, useState } from "react";
import { Dot, X } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchResults } from "..";
import { countries } from "@/constants/countries";

export function Locations({ form, isEditSession }) {

  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(() => {
    if (isEditSession) {
      const targeting = form.getValues()?.targeting

      if (targeting) {
        const targetingCountries = targeting.geo_locations.countries
        const selectedCountries = countries.filter((country) => targetingCountries.includes(country.key))
        setSelectedCountries(selectedCountries)
      }
    }
  }, [form, isEditSession])


  function handleSearch(value) {
    const trimmedValue = value.trim()
    
    if (trimmedValue.length === 0) {
        setResults([])
        return
    }

    const results = countries.filter((country) => country.name.toLowerCase().includes(trimmedValue.toLowerCase()))
    setResults(results)
}


  function handleInputChange(value) {
    setSearchTerm(value)

    handleSearch(searchTerm)
  }

  function setter(result) {

    const targeting = form.getValues()?.targeting

    setSelectedCountries((prev) => {

      const newState = [...prev, { key: result.key, name: result.name }]

      const newTargetingObj = {
        ...targeting,
        geo_locations: {
          countries: newState.map((country) => country.key)
        }
      }

      form.setValue("targeting", newTargetingObj)

      return newState
    })
  }

  function deleteCountry(key) {

    const targeting = form.getValues()?.targeting

    setSelectedCountries((prev) => {

      const newState = prev.filter((item) => key !== item.key)

      const newTargetingObj = {
        ...targeting,
        geo_locations: {
          countries: newState.map((country) => country.key)
        }
      }

      form.setValue("targeting", newTargetingObj)

      return newState
    })
  }

  return (
    <div className="space-y-2">
      <FormLabel>Locations</FormLabel>
      <FormDescription>Target your Ad Set selecting the countries where you want your ads to be displayed.</FormDescription>
      <Input
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search a country..."
      />
      <div className="flex items-center justify-start gap-x-2">
        {selectedCountries.map((country) => (
          <p className="flex items-center gap-x-1" key={country.key}>
            <Dot className="size-1" />
            <p className="text-xs">
              {country.name}
            </p>
            <X className="size-2 cursor-pointer" onClick={() => deleteCountry(country.key)} />
          </p>
        ))}
      </div>
      <SearchResults
        results={results}
        setResults={setResults}
        setSearchTerm={setSearchTerm}
        state={selectedCountries}
        setter={setter}
      />
    </div>
  )
}
