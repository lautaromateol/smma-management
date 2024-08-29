"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { cloneElement } from "react"

export function NavItem({ title, href, icon }) {

  const pathname = usePathname()

  return (
    <Link
      href={href}
    >
      <div className={cn(
        "flex items-center px-4 py-2 gap-x-4 w-full rounded-md text-sm font-medium text-neutral-500 hover:shadow-sm hover:bg-main-shade hover:text-main-tint",
        pathname === href ? "text-main-tint bg-main-shade" : ""
      )}>
        {cloneElement(icon, { className: "size-5" })}
        {title}
      </div>
    </Link>
  )
}