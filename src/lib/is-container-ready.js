import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function isContainerReady(container_id, access_token) {
  const maxAttempts = 5;
  const delay = 5000; 
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${container_id}?fields=status_code&access_token=${access_token}`);

    const data = await response.json();

    if(data.status_code === "ERROR") {
      console.log(data)
      return false
    } 

    if (data.status_code === 'FINISHED') {
      return true;
    }
    attempts++;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return false;
}