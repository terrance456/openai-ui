"use client";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import "./link-menu.scss";
import DropdownLink from "../DropdownLink/DropdownLink";
import DropdownItem from "../DropdownLink/DropdownItem/DropdownItem";
import { HomeRoutes } from "@/src/constants/route";
import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "@/src/contexts/AuthContext";

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
  const isMobile: boolean = useMediaQuery({ maxWidth: 576 });
  const { user } = useAuthContext();

  return user ? (
    <div className="link-menu-wrapper">
      {!isMobile ? (
        <ul className="link-menus">
          {props.routes.map((value: RoutesType, index: number) => (
            <li key={index}>
              <Link href={value.route} className={classNames({ "is-selected": pathname === value.route })}>
                {value.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <DropdownLink>
          <DropdownItem link={HomeRoutes.Home} isSelected={pathname === HomeRoutes.Home}>
            Home
          </DropdownItem>
          <DropdownItem link={HomeRoutes.History} isSelected={pathname === HomeRoutes.History}>
            History
          </DropdownItem>
        </DropdownLink>
      )}
    </div>
  ) : null;
}
