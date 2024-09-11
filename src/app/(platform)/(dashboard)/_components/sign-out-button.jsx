"use client"
import { useClerk } from "@clerk/nextjs";
import { ArrowUpRightFromSquare } from "lucide-react";

export function SignOutButton() {

  const { signOut } = useClerk()

  return (
    <div
      onClick={() => signOut({ redirectUrl: "/" })}
      role="button"
      className="flex items-center px-4 py-2 gap-x-4 w-full rounded-md text-sm font-medium text-neutral-500 hover:shadow-sm hover:bg-main-shade hover:text-main-tint">
      <ArrowUpRightFromSquare className="size-5" />
      Sign Out
    </div>
  )
}
