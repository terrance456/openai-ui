"use client";
import { User } from "firebase/auth";
import React, { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase";
import { CreditsResponseType, CreditsType } from "../types/get-credits.type";
import { getUserCredits } from "../apis";
import { ApiRoutes } from "../constants/route";
import { AxiosResponse } from "axios";

interface ContextReturnType {
  user?: User | null;
  loading: boolean;
  userCredits: CreditsType;
  reduceCredits: () => void;
  isLoadingCredits: boolean;
}

export const AuthContext: React.Context<ContextReturnType> = React.createContext<ContextReturnType>({} as ContextReturnType);

export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [user, loading] = useAuthState(auth);
  const [userCredits, setUserCredits] = React.useState<CreditsType>({ userId: "", email: "", credits: 0 });
  const [isLoadingCredits, setIsLoadingCredits] = React.useState<boolean>(true);

  const fetchCredits = () => {
    getUserCredits(ApiRoutes.GetCredits)
      .then((res: AxiosResponse<CreditsResponseType>) => {
        setUserCredits(res.data.userData);
      })
      .finally(() => setIsLoadingCredits(false));
  };

  const reduceCredits = () => {
    setUserCredits((prevCredits: CreditsType) => {
      if (prevCredits.credits !== 0) {
        return { ...prevCredits, credits: prevCredits.credits - 25 };
      }
      return prevCredits;
    });
  };

  React.useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user]);

  return <AuthContext.Provider value={{ user, loading, userCredits, reduceCredits, isLoadingCredits }}>{children}</AuthContext.Provider>;
};
