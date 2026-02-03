"use client";

import {
  PageHeader,
  PageHeaderRow,
  PageHeaderTitle,
} from "@dashboard/page-header";
import { GeneralSettingsForm } from "./_components/general-settings-form";

const GeneralSettingsPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderRow>
          <PageHeaderTitle>General</PageHeaderTitle>
        </PageHeaderRow>
      </PageHeader>

      <div className="max-w-2xl">
        <GeneralSettingsForm />
      </div>
    </>
  );
};

export default GeneralSettingsPage;
