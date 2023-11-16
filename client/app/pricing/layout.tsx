import React from "react";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { Metadata } from "next";
import { CommonLayoutProps } from "@/src/types/layout";

export const metadata: Metadata = {
  title: "Pricing | Nexusphere AI",
  description: "Pricing in Nexusphere AI",
};

export default function PricingLayout({ children }: CommonLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
