import { API_URL } from "@/constants/site"
import { redirect } from "next/navigation";

export default async function FacebookSuccessPage({ searchParams: { code, state, error, error_description } }) {

  const decodedState = decodeURIComponent(state);
  const matches = decodedState.match(/id=([^,}]+),agencyId=([^}]+)/);
  const id = matches ? matches[1] : null;
  const agencyId = matches ? matches[2] : null;

  if(error) {
    throw new Error(error_description)
  }

  const url = `${API_URL}/meta-auth?code=${code}&client_id=${id}&agency_id=${agencyId}`

  const response = await fetch(url)

  const data = await response.json()

  if (data.token) {
    const { token } = data
    redirect(`/agency/${agencyId}/clients/${token.clientId}`)
  }

  throw new Error(data)
}



