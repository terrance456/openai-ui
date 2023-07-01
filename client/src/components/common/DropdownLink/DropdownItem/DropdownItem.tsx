import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import Link from "next/link";

interface DropdownItemsProps {
  link: string;
  isSelected?: boolean;
}

export default function DropdownItem(props: PropsWithChildren<DropdownItemsProps>) {
  return (
    <li>
      <Link className={classNames("dropdown-item", { "is-selected": props?.isSelected })} href={props.link}>
        {props.children}
      </Link>
    </li>
  );
}
