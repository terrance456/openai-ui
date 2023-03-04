"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/src/Auth/firebase";

const LoginButton = () => {
  const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

  const postBE = (token: string) => {
    fetch("https://openaiuiapi.onrender.com/app", { headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const GoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        res.user.getIdToken().then((id) => {
          postBE(id);
        });
      })
      .catch(() => {
        alert("Login failed");
      });
  };
  return (
    <div>
      <button onClick={GoogleLogin}>login</button>
    </div>
  );
};

export default LoginButton;
