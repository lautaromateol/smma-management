import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["100" ,"200", "300", "400", "500", "600", "700", "900"] })

export const metadata = {
  title: {
    default: "Adsync",
    template: "%s | Adsync"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
