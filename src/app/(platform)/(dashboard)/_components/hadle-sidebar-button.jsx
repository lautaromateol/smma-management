"use client"
import { useOpenSidebar } from "@/hooks/use-open-sidebar"
import { ChevronRight } from "lucide-react"

export function HandleSidebarBtn() {

  const { isOpen, open } = useOpenSidebar((state) => state)

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center fixed top-1/2 -translate-x-1/3 left-0 z-10" onClick={open}>
        <button className="grid place-content-center size-6 p-4 rounded-full bg-white border-2">
          <ChevronRight className="size-4" />
        </button>
      </div>
    )
  }
}