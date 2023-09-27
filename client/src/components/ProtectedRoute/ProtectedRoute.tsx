"use client";
import React from "react";
import { auth } from "@/src/Auth/firebase";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const [user, loading] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return redirect("/");
    }
  }, [user, loading]);

  const renderContent = () => {
    if (loading) {
      return <div />;
    }
    if (!user) {
      return <div />;
    }
    return props.children;
  };

  return <>{renderContent()}</>;
}

export { ProtectedRoute };
