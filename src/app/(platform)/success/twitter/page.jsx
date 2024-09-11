import { API_URL } from "@/constants/site"
import { redirect } from "next/navigation";

export default async function TwitterSuccessPage({ searchParams: { code, state, error, error_description } }) {

  const decodedState = decodeURIComponent(state);
  const pairs = decodedState.split('/');
  const parsedObject = pairs.reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const { id, agencyId, codeVerifier } = parsedObject

  if(error) {
    throw new Error(error_description)
  }

  const url = `${API_URL}/twitter-auth?code=${code}&id=${id}&agency_id=${agencyId}&code_verifier=${codeVerifier}`

  const response = await fetch(url)
  
  const data = await response.json()

  if(data.token) {
    const { token } = data
    redirect(`/agency/${agencyId}/clients/${token.clientId}`)
  }

  throw new Error(data)

}
