"use client"
import { Calendar, Info, LayoutDashboardIcon, Megaphone, User, X } from "lucide-react"
import { NavItem } from "./nav-item"
import { SignOutButton } from "./sign-out-button"
import { useOpenSidebar } from "@/hooks/use-open-sidebar"
import { cn } from "@/lib/utils"

export function Sidebar({ orgId }) {

  const { isOpen, close } = useOpenSidebar((state) => state)

  const navLinks = [
    {
      title: "Dashboard",
      href: `/agency/${orgId}`,
      icon: <LayoutDashboardIcon />
    },
    {
      title: "Clients",
      href: `/agency/${orgId}/clients`,
      icon: <User />
    },
    {
      title: "Campaigns",
      href: `/agency/${orgId}/campaigns`,
      icon: <Megaphone />
    },
    {
      title: "Calendar",
      href: `/agency/${orgId}/calendar`,
      icon: <Calendar />
    },
    {
      title: "Reports",
      href: `/agency/${orgId}/reports`,
      icon: <Info />
    }
  ]

  return (
      <aside className={cn(
        "flex flex-col top-14 md:top-0 left-0 transform -translate-x-full transition-transform duration-300 ease-in-out gap-y-12 h-screen w-64 py-8 px-2 z-50 border-r bg-main-light border-main-shade shadow",
        isOpen ? "fixed md:sticky translate-x-0" : "fixed"
      )}>
        <X onClick={close} className="size-4 text-neutral-500 cursor-pointer absolute top-4 right-4" />
        <ul className="flex flex-col gap-y-4 mt-4">
          {navLinks.map(({ title, href, icon }) => (
            <NavItem
              key={href}
              title={title}
              href={href}
              icon={icon}
            />
          ))}
        </ul>
        <SignOutButton />
      </aside>
  )
}