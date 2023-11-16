import classNames from "classnames";
import React, { ReactNode } from "react";

interface BadgeProps {
  type: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  children: ReactNode;
  className?: string;
}

export default function Badge(props: BadgeProps) {
  const formatBadgeTheme = () => {
    switch (props.type) {
      case "primary": {
        return "bg-primary";
      }
      case "secondary": {
        return "bg-secondary";
      }
      case "success": {
        return "bg-success";
      }
      case "danger": {
        return "bg-danger";
      }
      case "warning": {
        return "bg-warning text-dark";
      }
      case "info": {
        return "bg-info text-dark";
      }
      case "light": {
        return "bg-light text-dark";
      }
      case "dark": {
        return "bg-dark";
      }
    }
  };

  return <span className={classNames("badge", formatBadgeTheme(), props?.className)}>{props.children}</span>;
}
