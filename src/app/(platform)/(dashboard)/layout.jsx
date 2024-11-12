import { auth } from "@clerk/nextjs/server";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Toaster } from "sonner";
import { HandleSidebarBtn } from "./_components/hadle-sidebar-button";

export default function DashboardLayout({ children }) {

  const { orgId } = auth()

  return (
    <div className="relative flex w-full min-h-screen">
      <Sidebar orgId={orgId} />
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