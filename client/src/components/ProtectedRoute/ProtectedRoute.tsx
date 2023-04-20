"use client";
import React from "react";
import { auth } from "@/src/Auth/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push("/");
    }
  }, [user, loading]);

  const renderContent = () => {
    if (loading) {
      return null;
    }
    if (!user) {
      return;
    }
    return props.children;
  };

  return <>{renderContent()}</>;
}

export { ProtectedRoute };
