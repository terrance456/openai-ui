import React from "react";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar p-3">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="#">
          Nexusphere AI
        </a>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
