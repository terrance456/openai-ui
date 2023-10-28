import React from "react";
import classNames from "classnames";
import "./page-layout.scss";

type PageLayoutProps = JSX.IntrinsicElements["div"];

export default function PageLayout({ className, ...props }: PageLayoutProps) {
  return <div className={classNames("container-fluid container-lg page-layout-wrapper", className)} {...props} />;
}
