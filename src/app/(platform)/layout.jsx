import { QueryProvider } from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({ children }) {
  return (
    <ClerkProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}
