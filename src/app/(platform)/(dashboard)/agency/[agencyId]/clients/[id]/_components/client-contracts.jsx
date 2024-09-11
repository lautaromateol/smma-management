"use client"
import { CardWrapper } from "../../../_components";
import { Contract } from "./contract";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAction } from "@/hooks/use-action";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { uploadContract } from "@/actions/upload-contract";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";

export function ClientContracts({ id, contracts }) {

  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const { execute, isPending } = useAction(uploadContract, {
    onSuccess: (data) => {
      toast.success(`Contract "${data.name}" uploaded`)
      setUploading(false)
    },
    onError: (error) => {
      toast.error(error)
      setUploading(false)
    }
  })

  function handleFileChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  async function handleUpload(file) {
    if (!file) return

    if(contracts.length === 2) {
      toast.error("You can't upload more than 2 contracts per client")
      return
    }

    const storageRef = ref(storage, `uploads/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    setUploading(true)

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.log(error)
        setUploading(false)
      },
      async () => {
        const { name, fullPath } = uploadTask.snapshot.ref
        const contractUrl = await getDownloadURL(uploadTask.snapshot.ref)
        execute({ name, fullPath, contractUrl, clientId: id })
      }
    )
  }

  return (
    <CardWrapper
      title="Client contracts"
      description="Add or review your service contracts with this client"
      className="border-none"
    >
      <div className="space-y-2 mb-4">
        {
          contracts.map((contract) => (
            <Contract contract={contract} key={contract.id} />
          ))
        }
      </div>
      <div className="space-y-2">
        <input
          className="cursor-pointer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          type="file"
          onChange={handleFileChange} />
        {file && <Button
          onClick={() => handleUpload(file)}
          disabled={uploading || isPending}
          variant="main"
        >
          {uploading ? `Uploading ${progress}%` : "Upload contract"}
        </Button>}
      </div>
    </CardWrapper>
  )
}
