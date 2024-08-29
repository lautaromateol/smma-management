import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}
