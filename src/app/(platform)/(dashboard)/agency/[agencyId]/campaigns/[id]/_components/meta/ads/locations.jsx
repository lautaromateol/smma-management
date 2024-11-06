import { useState } from "react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getMetaAccessToken } from "@/lib/get-meta-access-token";
import { fetcher } from "@/lib/fetcher";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { SearchResults } from "..";
import { Dot, X } from "lucide-react";

export function Locations({ data, form }) {

  const { campaign } = data

  const [searchTerm, setSearchTerm] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [results, setResults] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  async function handleSearch(value) {
    if (value.length === 0) return

    const accessToken = await getMetaAccessToken(campaign.clientId)

    const countries = await fetcher(`${FACEBOOK_API_GRAPH_URL}/search?type=adgeolocation&q=${value}&location_types=["country"]&access_token=${accessToken}`)

    if (countries.data) {
      const { data } = countries
      setResults(data)
    } else {
      setResults([])
    }
  }

  function handleSubmit() {

    const targeting = form.getValues()?.targeting

    const newTargetingObj = {
      ...targeting,
      geo_locations: {
        countries: selectedCountries.map((country) => country.key)
      }
    }

    form.setValue("targeting", newTargetingObj)
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

  function setter(state, result) {
    setSelectedCountries([...state, { key: result.key, name: result.name }])
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
            <X className="size-2 cursor-pointer" onClick={() => {
              setSelectedCountries((curr) => curr.filter((item) => country.key !== item.key))
            }} />
          </p>
        ))}
      </div>
      <SearchResults
        results={results}
        setResults={setResults}
        setSearchTerm={setSearchTerm}
        state={selectedCountries}
        setter={setter}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
