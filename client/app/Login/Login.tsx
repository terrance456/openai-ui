"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/Auth/firebase";
import { BsGoogle } from "react-icons/bs";
import "./login.scss";
import { FetchHttp } from "@/src/apis";
import { ApiRoutes, HomeRoutes } from "@/constants/route";
import { useAuthState } from "react-firebase-hooks/auth";
import GlobalLoader from "@/src/components/GlobalLoader/GlobalLoader";

const fetchHttp = new FetchHttp();

export default function Login() {
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const GoogleLogin = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        res.user.getIdToken().then((id: string) => {
          setIsLoading(false);
          setCookie(id).then(() => router.push(HomeRoutes.Home));
        });
      })
      .catch(() => {
        setIsLoading(false);
        alert("Login failed");
      });
  };

  const setCookie = (token: string) => {
    return fetchHttp.post(ApiRoutes.SetCookie, { headers: { Authorization: "Bearer " + token } });
  };

  React.useEffect(() => {
    if (user) {
      router.push(HomeRoutes.Home);
    }
  }, [user, loading]);

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
