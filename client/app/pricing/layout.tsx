import React from "react";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import PricingPage from "./page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Nexusphere AI",
  description: "Pricing in Nexusphere AI",
};

export default function PricingLayout() {
  return (
    <ProtectedRoute>
      <PricingPage />
    </ProtectedRoute>
  );
}
