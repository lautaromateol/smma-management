"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { API_URL } from "@/constants/site"

export default function SuccessPage() {

  const [pending, startTransition] = useTransition()
  const [error, setError] = useState(false)
  const searchParams = useSearchParams()

  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const decodedState = decodeURIComponent(state);
  const matches = decodedState.match(/id=([^,}]+),agencyId=([^}]+)/);
  const id = matches ? matches[1] : null;
  const agencyId = matches ? matches[2] : null;

  async function handleConfirm() {
    startTransition(async () => {
      setError(false)
      const response = await fetch(`${API_URL}/facebook-auth?code=${code}&id=${id}&agencyId=${agencyId}`)
      if (!response.ok) {
        setError(true)
      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center bg-main-light">
      {pending ?
        <div className="flex flex-col items-center gap-y-2">
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-solid border-main-tint border-t-transparent" />
          <p className="text-main-tint font-medium text-base">Linking account...</p>
        </div>
        :
        <div className="flex flex-col space-y-1">
          {error && <div className="py-2 px-4 bg-red-100 rounded-md border border-red-600 text-red-600 font-medium text-base">
            There was an error trying to link the account. Try again later.
          </div>}
          <div className="bg-white h-32 shadow-md rounded-md p-4 flex flex-col justify-between space-y-2">
            <p className="font-semibold text-base">Do you want to link this account to the client?</p>
            <div className="flex justify-start items-center gap-x-2">
              <Button
                onClick={handleConfirm}
                variant="main"
              >
                Confirm
              </Button>
              <Button
                variant="outline"
              >
                <Link href="/">
                  Cancel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
