import React, { Suspense } from "react";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { Metadata } from "next";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import PageLayout from "@/src/components/common/PageLayout/PageLayout";
import { CommonLayoutProps } from "@/src/types/layout";

export const metadata: Metadata = {
  title: "History | Nexusphere AI",
  description: "Welcome Nexusphere AI",
};

export default function Layout({ children }: CommonLayoutProps) {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <ProtectedRoute>
        <PageLayout>{children}</PageLayout>
      </ProtectedRoute>
    </Suspense>
  );
}
