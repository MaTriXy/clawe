"use client";

import {
  PageHeader,
  PageHeaderRow,
  PageHeaderTitle,
} from "@dashboard/page-header";

const AgentsPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderRow>
          <PageHeaderTitle>Agents</PageHeaderTitle>
        </PageHeaderRow>
      </PageHeader>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">No agents yet.</p>
      </div>
    </>
  );
};

export default AgentsPage;
