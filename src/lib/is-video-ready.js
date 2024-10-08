import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function getVideo(media_fbid, access_token) {
  const maxAttempts = 5;
  const delay = 5000; 
  let attempts = 0;

  while (attempts < maxAttempts) {
    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${media_fbid}?fields=thumbnails,source,status&access_token=${access_token}`);
    const data = await response.json();

    if (data.status.video_status === 'ready') {
      return data;
    }
    attempts++;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return null;
}