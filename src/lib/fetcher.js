export async function fetcher(url, headers) {
  const response = await fetch(url, {
    headers
  })

  const data = await response.json()

  return data
}