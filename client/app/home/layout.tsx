import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import React, { Suspense } from "react";
import Home from "./page";

export default function Layout() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Home />
    </Suspense>
  );
}
