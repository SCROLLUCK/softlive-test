import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full flex flex-col flex-1 overflow-y-auto">
        <SidebarTrigger />
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
