import React from "react";
import "./global-loader.scss";

export default function GlobalLoader() {
  return (
    <div className="global-loader-container">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
