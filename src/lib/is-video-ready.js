import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function getVideo(media_fbid, access_token, story) {
  const maxAttempts = 5;
  const delay = 30000; 
  let attempts = 0;

  while (attempts < maxAttempts) {

    const url = story ? `${FACEBOOK_API_GRAPH_URL}/${media_fbid}?fields=status&access_token=${access_token}` : `${FACEBOOK_API_GRAPH_URL}/${media_fbid}?fields=thumbnails,source,status&access_token=${access_token}`

    const response = await fetch(url);
    const data = await response.json();

    if(data.status.video_status === "error") return null

    if(story && data.status.uploading_phase.status === "complete") return data

    if (data.status.video_status === 'ready') {
      return data;
    }
    attempts++;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  return null;
}