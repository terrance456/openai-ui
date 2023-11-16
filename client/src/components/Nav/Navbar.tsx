import React from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Link from "next/link";
import LinkMenu from "../common/LinkMenu/LinkMenu";
import { HomeRoutes } from "@/src/constants/route";
import { FaReact } from "react-icons/fa";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <FaReact className="nexus-logo" />
        <Link className="navbar-brand text-light" href="/home">
          Nexusphere AI
        </Link>
        <div className="menus">
          <LinkMenu
            routes={[
              { label: "Home", route: HomeRoutes.Home },
              { label: "History", route: HomeRoutes.History },
            ]}
          />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}
