"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@clawe/ui/components/scroll-area";
import { SidebarInset, SidebarProvider } from "@clawe/ui/components/sidebar";
import { DashboardSidebar } from "@dashboard/dashboard-sidebar";
import { isLockedSidebarRoute } from "@dashboard/sidebar-config";
import { SquadProvider } from "@/providers/squad-provider";

type DashboardLayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
};

const DashboardLayout = ({ children, header }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(
    () => !isLockedSidebarRoute(pathname),
  );

  // Update sidebar state when route changes
  useEffect(() => {
    setSidebarOpen(!isLockedSidebarRoute(pathname));
  }, [pathname]);

  return (
    <SquadProvider>
      <SidebarProvider
        className="bg-sidebar h-svh overflow-hidden"
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        style={{ "--sidebar-width-icon": "2rem" } as React.CSSProperties}
      >
        <DashboardSidebar />
        <SidebarInset className="bg-background overflow-hidden rounded-none border md:rounded-xl md:peer-data-[variant=inset]:shadow-none md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-1">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b">
            {header}
          </header>
          <ScrollArea className="h-full min-h-0 flex-1">
            <main className="p-6">{children}</main>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </SquadProvider>
  );
};

export default DashboardLayout;
