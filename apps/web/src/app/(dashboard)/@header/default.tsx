"use client";

import { usePathname } from "next/navigation";
import { SidebarToggle } from "@dashboard/sidebar-toggle";
import { isLockedSidebarRoute } from "@dashboard/sidebar-config";

const DefaultHeaderContent = () => {
  const pathname = usePathname();

  if (isLockedSidebarRoute(pathname)) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarToggle className="-ml-1" />
    </div>
  );
};

export default DefaultHeaderContent;
