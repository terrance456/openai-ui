import React from "react";
import { ProtectedRoute } from "@/src/components/ProtectedRoute";
import { CommonLayoutProps } from "@/src/types/layout";

export default function Layout({ children }: CommonLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
