import { OrganizationSwitcher } from "@clerk/nextjs"
import { experimental__simple } from "@clerk/themes"
import { Logo } from "../../../../components/logo"

export function Header() {
  return (
    <header className="h-14 z-50 sticky top-0 shadow p-4 flex items-center justify-between border-b bg-main-light border-main-shade">
      <Logo />
      <OrganizationSwitcher
        appearance={{
          baseTheme: experimental__simple
        }}
      />
    </header>
  )
}