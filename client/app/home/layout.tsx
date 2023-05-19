import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Home from "./page";
import Favicon from "../favicon.ico";

export const metadata: Metadata = {
  title: "Home | Nexusphere AI",
  description: "Welcome Nexusphere AI",
};

export default function Layout() {
  return (
    <>
      <link rel="icon" href={Favicon.src} />
      <Suspense fallback={<GlobalLoader />}>
        <Home />
      </Suspense>
    </>
  );
}
