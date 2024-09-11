"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TWITTER_CLIENT_ID, TWITTER_REDIRECT_URI } from "@/constants/twitter";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

export function TwitterButton({ client }) {

  function generateCodeVerifier() {
    const array = new Uint32Array(56);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(36)).join('');
  }

  async function generateCodeChallenge(codeVerifier) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier))
      .then(hash => btoa(String.fromCharCode(...new Uint8Array(hash))))
      .then(b64Str => b64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));
  }


  async function onClick() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${TWITTER_REDIRECT_URI}&scope=tweet.read%20users.read%20offline.access%20tweet.write&state=agencyId=${client.orgId}/id=${client.id}/codeVerifier=${codeVerifier}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = authUrl;
  }


  const { data, isPending } = useQuery({
    queryKey: ["client-twitter-data", client.id],
    queryFn: () => fetcher(`/api/clients/twitter-data?client_id=${client.id}`)
  })


  if (isPending && client.twitterAccessToken) {
    return (
      <Skeleton className="h-20" />
    )
  }

  if (!client.twitterAccessToken) {
    return (
      <div className="flex items-center justify-between border p-4 rounded-md">
        <div className="flex items-center gap-x-2">
          <FaXTwitter className="size-4" />
          <p className="text-sm font-medium">X</p>
        </div>
        <Button
          onClick={onClick}
          variant="outline"
          size="sm"
        >
          Link
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex items-center gap-x-2">
        <Image
          src={data.image}
          width={40}
          height={40}
          className="rounded-full"
          alt="User Meta profile picture"
        />
        <div className="space-y-0 5">
          <p className="font-medium text-base text-neutral-700">{data.name}</p>
          <p className="font-medium text-sm text-neutral-500">@{data.username}</p>
        </div>
      </div>
      <FaXTwitter className="size-4" />
    </div>
  )
}
