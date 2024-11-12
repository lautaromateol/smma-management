"use client"
import { useClerk } from "@clerk/nextjs";
import { ArrowUpRightFromSquare } from "lucide-react";
import { NavItem } from "./nav-item";

export function SignOutButton() {

  const { signOut } = useClerk()

  return (
    <NavItem
      icon={<ArrowUpRightFromSquare />}
      onClick={() => signOut({ redirectUrl: "/" })}
      title="Sign Out"
    />
  )
}
