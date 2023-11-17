import React from "react";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { CommonLayoutProps } from "@/src/types/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchases | Nexusphere AI",
  description: "Purchases in Nexusphere AI",
};

export default function Layout({ children }: CommonLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
