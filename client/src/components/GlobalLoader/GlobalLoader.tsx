"use client";
import React from "react";
import "./global-loader.scss";
import { useBodyScrollLock } from "@/src/hooks/useBodyScollLock";

export default function GlobalLoader() {
  const { toggleBodyOverflow } = useBodyScrollLock();

  React.useEffect(() => {
    toggleBodyOverflow(true);
    return () => toggleBodyOverflow(false);
  }, []);

  return (
    <div className="global-loader-container">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
