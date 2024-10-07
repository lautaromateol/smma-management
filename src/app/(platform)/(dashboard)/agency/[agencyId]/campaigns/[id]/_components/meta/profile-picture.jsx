"use client"
import Image from "next/image";
import { useRef, useState, useTransition } from "react"
// import { Pencil } from "lucide-react";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { toast } from "sonner";
// import { cn } from "@/lib/utils";

export function ProfilePicture({ form, accessToken, fbPageId, picture }) {

  const [isPending, startTransition] = useTransition()
  const [profileSrc, setProfileSrc] = useState(picture ?? "")

  const inputRef = useRef(null)

  function handlePencilClick() {
    inputRef.current.click()
  }

  function handleFileChange(e) {
    const input = e.target.files[0]

    if (!input) return

    const formData = new FormData()

    formData.append("source", input)
    formData.append("published", false)
    formData.append("access_token", accessToken)

    try {
      startTransition(async () => {
        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/photos`, {
          method: "POST",
          body: formData
        })

        const data = await response.json()

        if (data.id) {
          const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${data.id}?fields=images&access_token=${accessToken}`)

          const imagesData = await response.json()

          if (imagesData.images) {
            const { images } = imagesData
            const image = images[0]
            setProfileSrc(image.source)
            form.setValue("profile_picture_url", image.source, { shouldDirty: true })
          } else {
            console.log(imagesData)
            toast.error("There was an error obtaining the preview")
          }
        } else {
          console.log(data)
          toast.error("There was an error uploading your new profile picture")
        }
      })
    } catch (error) {
      console.log(error)
      toast.error("There was an error uploading your new profile picture")
    }
  }

  return (
    <div
      className="relative h-96 w-4/5 mx-auto"
    >
      <Image
        src={profileSrc}
        alt="Instagram profile picture"
        fill
        className="object-cover"
      />
      {/* <Pencil
        onClick={handlePencilClick}
        className={cn(
          "absolute top-2 right-2 size-6 text-gray-500 cursor-pointer",
          isPending && "hidden"
        )}
      /> */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
