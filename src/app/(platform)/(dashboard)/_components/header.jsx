import { OrganizationSwitcher } from "@clerk/nextjs"
import { shadesOfPurple, experimental__simple } from "@clerk/themes"

export function Header() {
  return (
    <header className="h-14 shadow p-4 flex items-center justify-end border-b border-main-shade">
        <OrganizationSwitcher
          appearance={{
            baseTheme: experimental__simple
          }}
        />
    </header>
  )
}