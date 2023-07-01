import React, { Suspense } from "react";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { Metadata } from "next";
import Home from "./page";

export const metadata: Metadata = {
  title: "Home | Nexusphere AI",
  description: "Welcome Nexusphere AI",
};

export default function Layout() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Home />
    </Suspense>
  );
}
