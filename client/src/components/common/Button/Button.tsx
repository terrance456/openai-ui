import classNames from "classnames";
import React from "react";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  loading?: boolean;
  theme: "primary" | "secondary" | "success" | "danger" | "info" | "light" | "outline-primary" | "outline-secondary" | "outline-success" | "outline-danger" | "outline-info" | "outline-light";
  size?: "sm" | "lg";
  className?: string;
};

export default function Button({ loading, theme, size, children, className, ...props }: React.PropsWithChildren<ButtonProps>) {
  const newClassName: string = classNames("btn", `btn-${theme}`, size && `btn-${size}`, className);

  return (
    <button className={newClassName} {...props}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
