"use client";

import {
  PageHeader,
  PageHeaderRow,
  PageHeaderTitle,
} from "@dashboard/page-header";

const BoardPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderRow>
          <PageHeaderTitle>Board</PageHeaderTitle>
        </PageHeaderRow>
      </PageHeader>

      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">No tasks yet.</p>
      </div>
    </>
  );
};

export default BoardPage;
