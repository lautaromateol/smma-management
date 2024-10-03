"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"

export function CityInput({ accessToken, city, setCity, setState, setCountry }) {
  const [searchTerm, setSearchTerm] = useState(city)
  const [results, setResults] = useState([])
  const [debounceTimeout, setDebounceTimeout] = useState(null);

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
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="No city"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pr-10"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      {results?.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
          {results.map((result) => (
            <li
              key={result.key}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm(result.name)
                setCity(result.name)
                setState(result.region)
                setCountry(result.country_code)
                setResults([])
              }}
            >
              {result.name}, {result.country_name}
            </li>
          ))}
        </ul>
      )}
    </div>
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