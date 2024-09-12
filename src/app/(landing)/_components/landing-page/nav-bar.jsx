import { Logo } from "@/components/logo";
import Link from "next/link";

const navLinks = [
  {
    title: "About",
    href: "/about"
  },
  {
    title: "Privacy policy",
    href: "/privacy-policy"
  },
]

export function NavBar() {

  return (
    <header className="sticky top-0 flex items-center justify-between w-full h-14 px-4 py-6">
      <Logo />
      <ul className="flex items-center gap-x-4 text-sm font-medium text-main">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <li className="hover:text-main-tint">
              {link.title}
            </li>
          </Link>
        ))}
        <Link href="/sign-in">
          <li className="px-2 py-1 rounded-md bg-gradient-to-r from-main to-main-tint text-white hover:bg-main-tint">
            Sign in
          </li>
        </Link>
      </ul>
    </header>
  )
}
