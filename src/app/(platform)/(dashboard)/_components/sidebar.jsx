"use client"
import { Calendar, Info, LayoutDashboardIcon, Megaphone, User, X } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useOpenSidebar } from "@/hooks/use-open-sidebar"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { NavItem } from "./nav-item"
import { SignOutButton } from "./sign-out-button"
import { Logo } from "@/components/logo"

export function Sidebar({ orgId }) {

  const { isOpen } = useOpenSidebar((state) => state)

  const navLinks = [
    // {
    //   title: "Dashboard",
    //   href: `/agency/${orgId}`,
    //   icon: <LayoutDashboardIcon />
    // },
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
    // {
    //   title: "Calendar",
    //   href: `/agency/${orgId}/calendar`,
    //   icon: <Calendar />
    // },
    // {
    //   title: "Reports",
    //   href: `/agency/${orgId}/reports`,
    //   icon: <Info />
    // }
  ]

  const { user, isLoaded } = useUser()

  return (
    <aside className={cn(
      "flex flex-col top-14 md:top-0 left-0 transform -translate-x-full transition-transform duration-300 ease-in-out justify-between h-screen w-72 py-8 z-50 border-r bg-white border-gray-100",
      isOpen ? "fixed md:sticky translate-x-0" : "fixed"
    )}>
      <div className="flex flex-col gap-y-8">
        <Logo />
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
        <SignOutButton />
      </div>
      {isLoaded && (
        <div className="flex items-center gap-x-2 px-2">
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt={user?.fullName} />
          </Avatar>
          <p className="text-sm font-light">{user?.fullName}</p>
        </div>
      )}
    </aside>
  )
}