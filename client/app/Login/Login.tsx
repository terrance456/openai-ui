"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/Auth/firebase";
import { BsGoogle } from "react-icons/bs";
import "./login.scss";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { v4 as uuidv4 } from "uuid";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";
import { useAuthContext } from "@/src/contexts/AuthContext";

export default function Login() {
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { updateToastList } = useToastNotificationContext();
  const { loading } = useAuthContext();

  const GoogleLogin = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then()
      .catch(() => {
        setIsLoading(false);
        updateToastList({ id: uuidv4(), header: "Login failed", body: "Please try again to login", type: ToastIndicatorType.WARNING });
      });
  };

  return (
    <section className="login-container">
      <div className="login-header">
        <h6>Login into</h6>
        <h2>Nexusphere AI</h2>
      </div>
      <div className="login-btns">
        <button className="btn btn-primary" onClick={GoogleLogin}>
          <BsGoogle /> Continue with Google
        </button>
        <hr />
      </div>
      <small className="coming-soon">New login methods coming soon.</small>
      {(loading || isLoading) && <GlobalLoader />}
    </section>
  );
}
