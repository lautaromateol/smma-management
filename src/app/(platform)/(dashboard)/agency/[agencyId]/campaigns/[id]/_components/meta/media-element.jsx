import { Skeleton } from "@/components/ui/skeleton"
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { fetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"

export function MediaElement({ id, accessToken }) {

  const { data, isPending } = useQuery({
    queryKey: ["media-data", id],
    queryFn: () => fetcher(`${FACEBOOK_API_GRAPH_URL}/${id}?fields=images&access_token=${accessToken}`)
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="size-[480px]" />
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      </div>
    )
  }

  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  )
}

/*
{
  "images": [
    {
      "height": 1024,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYAmwkTnZmHgI6vJl6ENDXAYpuoyPP14VDjHoQJRg_ZpfA&oe=66EE9888",
      "width": 768
    },
    {
      "height": 960,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYDYdc9aDIx51KUZicOjxJ8NgPH9WFrcF-YiZ4gv7LEuKA&oe=66EE9888",
      "width": 720
    },
    {
      "height": 800,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_p600x600&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYCJ5f-3DLyCQMuoxOXOai4XBghxbWGopTxIJ7wiOkAbVA&oe=66EE9888",
      "width": 600
    },
    {
      "height": 640,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_s640x640&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYA0UKjt06S6OoGxQj8ozaUzU9pIeiqtUO8-IMfX9_IIoQ&oe=66EE9888",
      "width": 480
    },
    {
      "height": 427,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYAqcx7UPlf_PxEliafHeh5V2D7OR4IRaNA3Qt-WZfCzxw&oe=66EE9888",
      "width": 320
    },
    {
      "height": 540,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_p180x540&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYC6-PqtIkwQ0PcghhMH_gXx-L9poNg7oFZmngpOn1FRuA&oe=66EE9888",
      "width": 405
    },
    {
      "height": 173,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_p130x130&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYDvgN20i5W3EhHGjOktg_XKV6EGhYIyiziUBA-932TTcw&oe=66EE9888",
      "width": 130
    },
    {
      "height": 225,
      "source": "https://scontent.fcnq2-1.fna.fbcdn.net/v/t39.30808-6/460077038_504728802507136_1080974208656773600_n.jpg?stp=dst-jpg_p75x225&_nc_cat=106&ccb=1-7&_nc_sid=054031&_nc_eui2=AeHsm3mGi5rEe7HgtbP7ya8AtRBOWHccu-G1EE5Ydxy74cYjtBlgrt-BXfM-yDC8h-Kh9ulSSnJY04ZYpNtK5q8g&_nc_ohc=ezUGtY7j0WMQ7kNvgEVpDU2&_nc_ht=scontent.fcnq2-1.fna&edm=AMAeTUEEAAAA&_nc_gid=ACO7Bi6R89vq7mdxeUIez0G&oh=00_AYChXRBnkiDizuagNdiwlMLDr7ci-qrn8nt2VdDpdeoaLA&oe=66EE9888",
      "width": 169
    }
  ],
  "id": "504728799173803"
}

*/