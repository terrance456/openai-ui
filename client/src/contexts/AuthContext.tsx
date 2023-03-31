"use client";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase";
import { HomeRoutes } from "../constants/route";

interface ContextReturnType {
  user?: User | null;
  loading: boolean;
}

export const AuthContext: React.Context<ContextReturnType> = React.createContext<ContextReturnType>({} as ContextReturnType);

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      user.getIdToken().then((id: string) => {
        localStorage.setItem("secret", id);
        router.replace(HomeRoutes.Home);
      });
      return;
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
