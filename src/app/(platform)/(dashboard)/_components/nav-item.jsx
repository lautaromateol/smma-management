"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { cloneElement, useState } from "react"

export function NavItem({ title, href, icon, onClick }) {

  const [onHover, setOnHover] = useState(false)

  const pathname = usePathname()
  const location = pathname.split("/")[3] || "/"
  const hrefSplitted = href?.split("/")[3] || "/"

  if (!onClick) {
    return (
      <Link
        href={href}
      >
        <div
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}
          className={cn(
            "flex items-center px-2 py-1 gap-x-4 w-full text-sm font-light text-gray-700 hover:bg-main-shade",
            location === hrefSplitted && "bg-main-shade",
            onHover && "text-main-tint"
          )}>
          {cloneElement(icon, { className: "size-5 text-main font-thin" })}
          {title}
        </div>
      </Link>
    )
  } else {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        role="button"
        className={cn(
          "flex items-center px-2 py-1 gap-x-4 w-full text-sm font-light text-gray-700 hover:bg-main-shade",
          onHover && "text-main-tint"
        )}>
        {cloneElement(icon, { className: "size-5 text-main font-thin" })}
        {title}
      </div>
    )
  }
}