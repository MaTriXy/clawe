"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@clawe/ui/components/breadcrumb";

// Map route segments to display titles
const routeTitles: Record<string, string> = {
  emails: "Emails",
  workflows: "Workflows",
  audience: "Audience",
  templates: "Templates",
  settings: "Settings",
  // Add more as needed, e.g.:
  // "new": "New",
  // "edit": "Edit",
};

// Get display title for a route segment
function getTitle(segment: string): string {
  // Check config first
  if (routeTitles[segment]) {
    return routeTitles[segment];
  }
  // Fallback: capitalize and replace hyphens with spaces
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

interface BreadcrumbSegment {
  title: string;
  href: string;
}

export function DashboardBreadcrumb() {
  const segments = useSelectedLayoutSegments();

  // Build breadcrumb items with cumulative paths
  const breadcrumbs: BreadcrumbSegment[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      title: getTitle(segment),
      href,
    };
  });

  // Don't render if no breadcrumbs (shouldn't happen in dashboard)
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={crumb.href}>
              <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={index === 0 ? "hidden md:block" : ""}
                />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
