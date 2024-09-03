import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { Calendar, Info, LayoutDashboardIcon, Megaphone, User } from "lucide-react"
import { NavItem } from "./nav-item"


export function Sidebar() {

  const { orgId } = auth()

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
    <aside className="flex flex-col sticky top-0 gap-y-6 h-screen w-64 py-8 px-2 border-r bg-main-light border-main-shade shadow">
      <ul className="flex flex-col gap-y-4">
        {navLinks.map(({ title, href, icon }) => (
          <NavItem
            key={href}
            title={title}
            href={href}
            icon={icon}
          />
        ))}
      </ul>
    </aside>
  )
}