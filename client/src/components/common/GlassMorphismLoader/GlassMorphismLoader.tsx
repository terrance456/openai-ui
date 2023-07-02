import React from "react";
import classNames from "classnames";
import "./glass-morphism-loader.scss";

interface GlassMorphismLoaderProps {
  className?: string;
}

export default function GlassMorphismLoader(props: GlassMorphismLoaderProps) {
  return (
    <div className={classNames("glass-morphism-loader", props.className)}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
