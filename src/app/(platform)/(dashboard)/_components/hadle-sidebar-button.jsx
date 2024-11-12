"use client"
import { useOpenSidebar } from "@/hooks/use-open-sidebar"
import { Sidebar } from "lucide-react"

export function HandleSidebarBtn() {

  const { isOpen, open, close } = useOpenSidebar((state) => state)

  return (
    <Sidebar className="size-5 text-gray-500 font-extralight cursor-pointer" onClick={isOpen ? close : open} />
  )
}