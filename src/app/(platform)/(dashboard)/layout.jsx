import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Toaster />
          {children}
        </main>
      </div>
    </div>
  )
}