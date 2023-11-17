"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineHome, AiOutlineHistory } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { HomeRoutes } from "@/src/constants/route";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/src/contexts/AuthContext";
import { useMobileMediaQuery } from "@/src/hooks/useMobileMediaQuery";
import "./bottom-navigation.scss";

export default function BottomNavigation() {
  const pathname: string = usePathname();
  const { user } = useAuthContext();
  const isMobile: boolean = useMobileMediaQuery();

  if (!user) {
    return null;
  }

  return isMobile ? (
    <section className="bottom-nav-container">
      <Link className={classNames("nav-item", { "is-active": pathname === HomeRoutes.Home })} href={HomeRoutes.Home}>
        <AiOutlineHome />
        <span>Home</span>
      </Link>
      <Link className={classNames("nav-item", { "is-active": pathname === HomeRoutes.History })} href={HomeRoutes.History}>
        <AiOutlineHistory />
        <span>History</span>
      </Link>
      <span className="nav-item">
        <FaReact />
        <span>Nexus</span>
      </span>
      <Link className={classNames("nav-item", { "is-active": pathname === HomeRoutes.Purchases })} href={HomeRoutes.Purchases}>
        <CgProfile />
        <span>Profile</span>
      </Link>
    </section>
  ) : null;
}
