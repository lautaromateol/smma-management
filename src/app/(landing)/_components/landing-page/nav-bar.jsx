"use client"
import { Logo } from "@/components/logo";
import { useOpenNavbar } from "@/hooks/use-open-navbar";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

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

  const { isOpen, open, close } = useOpenNavbar((state) => state)

  const sidebarRef = useRef(null)

  useOnClickOutside(sidebarRef, () => {
    if (isOpen) close()
  })

  return (
    <>
      <header className="sticky top-0 bg-white flex items-center justify-between w-full h-14 px-4 py-6">
        <Logo />
        <ul className="hidden md:flex items-center gap-x-4 text-sm font-medium text-main">
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
        <Menu onClick={open} className="md:hidden size-4 text-main-tint" />
      </header>
      <nav ref={sidebarRef} className={cn(
        "md:hidden h-full w-[300px] p-4 bg-main-light z-50 fixed top-0 right-0 transform translate-x-full transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : ""
      )}>
        <X onClick={close} className="size-4 absolute top-5 right-5 text-main-tint" />
        <ul className="flex flex-col gap-y-4 texts-m font-medium text-main">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <li onClick={close} className="hover:text-main-tint">
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
      </nav>
    </>
  )
}
