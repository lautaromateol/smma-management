import { useState, useTransition } from "react";
import { Dot, X } from "lucide-react";
import { FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/fetcher";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { SearchResults } from "..";

export function Locales({ data, form }) {

  const { userAccessToken } = data

  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  const [results, setResults] = useState([])
  const [selectedLocales, setSelectedLocales] = useState([])

  function handleSearch(value) {
    startTransition(async () => {
      if (value.length === 0) return

      const locales = await fetcher(`${FACEBOOK_API_GRAPH_URL}/search?type=adlocale&q=${value}&access_token=${userAccessToken}`)

      if (locales.data) {
        const { data } = locales
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

    setSelectedLocales((prev) => {

      const newState = [...prev, { key: result.key, name: result.name }]

      const newTargetingObj = {
        ...targeting,
        locales: newState.map((locale) => locale.key)
      }

      form.setValue("targeting", newTargetingObj)

      return newState
    })
  }

  function deleteLocale(key) {

    const targeting = form.getValues()?.targeting

    setSelectedLocales((prev) => {

      const newState = prev.filter((item) => key !== item.key)

      const newTargetingObj = {
        ...targeting,
        locales: newState.map((country) => country.key)
      }

      form.setValue("targeting", newTargetingObj)

      return newState

    })
  }


  return (
    <div className="space-y-2">
      <FormLabel>Languages</FormLabel>
      <FormDescription>Enter a language to show your ads to people who use a language that isn&apos;t common to your location. Otherwise, leave this blank.</FormDescription>
      <Input
        value={searchTerm}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search a language..."
      />
      <div className="flex items-center justify-start gap-x-2">
        {selectedLocales.map((locale) => (
          <p className="flex items-center gap-x-1" key={locale.key}>
            <Dot className="size-1" />
            <p className="text-xs">
              {locale.name}
            </p>
            <X className="size-2 cursor-pointer" onClick={() => deleteLocale(locale.key)} />
          </p>
        ))}
      </div>
      <SearchResults
        results={results}
        setResults={setResults}
        setSearchTerm={setSearchTerm}
        state={selectedLocales}
        setter={setter}
        isPending={isPending}
      />
    </div>
  )
}
