import { useState, useTransition } from "react";
import { Dot, X } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { SearchResults } from "..";

export function Locations({ data, form }) {

  const { userAccessToken } = data

  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [results, setResults] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  function handleSearch(value) {
    startTransition(async () => {
      if (value.length === 0) return

      const countries = await fetcher(`${FACEBOOK_API_GRAPH_URL}/search?type=adgeolocation&q=${value}&location_types=["country"]&access_token=${userAccessToken}`)

      if (countries.data) {
        const { data } = countries
        setResults(data)
      } else {
        setResults([])
      }
    })
  }

  function handleInputChange(value) {
    setSearchTerm(value)

    if (debounceTimeout) {
      clearTimeout(debounceTimeout)
    }

    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm)
    }, 2000)

    setDebounceTimeout(timeoutId)
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

      console.log(newState)

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
        isPending={isPending}
      />
    </div>
  )
}
