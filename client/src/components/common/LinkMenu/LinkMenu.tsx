"use client";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { useMobileMediaQuery } from "@/src/hooks/useMobileMediaQuery";
import "./link-menu.scss";

interface RoutesType {
  label: string;
  route: string;
}

interface LinkMenuProps {
  routes: Array<RoutesType>;
  className?: string;
}

export default function LinkMenu(props: LinkMenuProps) {
  const pathname: string = usePathname();
  const isMobile: boolean = useMobileMediaQuery();
  const { user } = useAuthContext();

  return user ? (
    <div className="link-menu-wrapper">
      {!isMobile && (
        <ul className="link-menus">
          {props.routes.map((value: RoutesType, index: number) => (
            <li key={index}>
              <Link href={value.route} className={classNames({ "is-selected": pathname === value.route })}>
                {value.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : null;
}
