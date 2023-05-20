import React from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./navbar.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar p-3">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" href="/home">
          Nexusphere AI
        </Link>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
