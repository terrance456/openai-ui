import React, { Suspense } from "react";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { Metadata } from "next";
import History from "./page";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";

export const metadata: Metadata = {
  title: "History | Nexusphere AI",
  description: "Welcome Nexusphere AI",
};

export default function Layout() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <ProtectedRoute>
        <PageLayout>
          <History />
        </PageLayout>
      </ProtectedRoute>
    </Suspense>
  );
}
