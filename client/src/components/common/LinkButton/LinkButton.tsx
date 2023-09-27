import React from "react";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";

type LinkButtonProps = LinkProps & {
  loading?: boolean;
  theme: "primary" | "secondary" | "success" | "danger" | "info" | "light" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-info" | "outline-light";
  size?: "sm" | "lg";
  className?: string;
};

export default function LinkButton({ loading, theme, size, children, className, ...props }: React.PropsWithChildren<LinkButtonProps>) {
  const newClassName: string = classNames("btn", `btn-${theme}`, size && `btn-${size}`, className);

  return (
    <Link className={newClassName} {...props}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}
