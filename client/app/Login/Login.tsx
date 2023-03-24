"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/Auth/firebase";
import { BsGoogle } from "react-icons/bs";
import "./login.scss";
import { HomeRoutes } from "@/src/constants/route";
import { useAuthState } from "react-firebase-hooks/auth";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";
import { v4 as uuidv4 } from "uuid";
import { useToastNotificationContext } from "@/src/contexts/ToastNotificationContext";
import { ToastIndicatorType } from "@/src/components/ToastNotification/ToastNotification";

export default function Login() {
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { updateToastList } = useToastNotificationContext();

  const GoogleLogin = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then()
      .catch(() => {
        setIsLoading(false);
        updateToastList({ id: uuidv4(), header: "Login failed", body: "Please try again to login", type: ToastIndicatorType.WARNING });
      });
  };

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then((id: string) => {
        localStorage.setItem("secret", id);
        router.push(HomeRoutes.Home);
      });
      return;
    }
  }, [user]);

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
