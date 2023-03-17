"use client";

import React from "react";
import "./navbar.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/src/Auth/firebase";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);

  const onLogout = () => {
    auth.signOut().then();
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="#">
          Nexusphere AI
        </a>
        {!!user && (
          <button className="btn btn-light" onClick={onLogout}>
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
