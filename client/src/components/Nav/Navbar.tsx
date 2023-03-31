import React from "react";
import "./navbar.scss";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="#">
          Nexusphere AI
        </a>
        <ProfileDropdown />
      </div>
    </nav>
  );
}
