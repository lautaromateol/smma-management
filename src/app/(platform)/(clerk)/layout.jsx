import { ClerkProvider } from "@clerk/nextjs";

export default function ClerkLayout({ children }) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </main>
  )
}
