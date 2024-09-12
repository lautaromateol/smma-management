import { Logo } from "@/components/logo";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center rounded-md shadow-md px-2 py-6 min-h-56">
      <Logo />
      <SignIn appearance={{
        elements: {
          card: {
            paddingTop: "8px",
            boxShadow: "none",
            border: "none"
          },
          cardBox: {
            boxShadow: "none",
            border: "none"
          },
          footer: {
            display: "none"
          }
        }
      }} />
      <Link href="/sign-up" className="text-sm text-muted-foreground underline">
        Don&apos;t you have an account? Sign up now
      </Link>
    </div>
  )
}
