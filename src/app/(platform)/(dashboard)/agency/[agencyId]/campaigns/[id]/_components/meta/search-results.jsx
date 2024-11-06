export function SearchResults({ results, setResults, setSearchTerm, state, setter, handleSubmit, isPending }) {

  if (isPending) {
    return (
      <div className="z-10 w-full bg-white border border-gray-300 rounded-md max-h-60">
        <div className="flex items-center gap-x-2 px-4 py-2 text-sm font-medium">
          Searching
          <div className="size-4 animate-spin rounded-full border-2 border-solid border-black border-t-transparent" />
        </div>
      </div>
    )
  }

  return (
    <>
      {results?.length > 0 && (
        <ul className="z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-auto">
          {results.map((result) => (
            <li
              key={result.key}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm(result.name)
                if (state.includes({ key: result.key, name: result.name })) return
                setter(state, result)
                setResults([])
                handleSubmit()
              }}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
