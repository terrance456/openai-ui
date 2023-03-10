"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/Auth/firebase";
import { BsGoogle } from "react-icons/bs";
import "./login.scss";

export default function Login() {
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
  const router = useRouter();

  const GoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        router.push("/welcome");
      })
      .catch(() => {
        alert("Login failed");
      });
  };
  return <section className="login-container">login</section>;
}
