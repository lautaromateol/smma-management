"use client"
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-main-light">
      <div className="flex flex-col items-center gap-y-2">
        <AlertTriangle className="size-8 text-main-tint" />
        <p className="text-main-tint font-medium text-base">There was an error linking the account to the client. Try again later</p>
      </div>
    </div>
  )
}
