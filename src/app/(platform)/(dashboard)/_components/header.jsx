import { OrganizationSwitcher } from "@clerk/nextjs"
import { experimental__simple } from "@clerk/themes"
import { HandleSidebarBtn } from "./hadle-sidebar-button"

export function Header() {
  return (
    <header className="h-14 z-50 sticky top-0 p-4 flex items-center justify-between border-b bg-white border-gray-100">
      <HandleSidebarBtn />
      <OrganizationSwitcher
        appearance={{
          baseTheme: experimental__simple
        }}
      />
    </header>
  )
}