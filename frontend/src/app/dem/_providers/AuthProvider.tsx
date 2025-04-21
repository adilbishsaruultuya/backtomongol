"use client";

import { api } from "@/common";
import { UserType, SignInProps } from "@/types/common.types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  loggedIn: null | boolean;
  loading: boolean;
  //   admin: boolean;
  //   user: UserType | undefined;
  signIn: (props: SignInProps) => Promise<void>;
  //   getUser: () => Promise<void>;
  signOut: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // ログイン処理
  const signIn = async (props: SignInProps) => {
    const { email, password } = props;
    try {
      setLoading(true);
      const { data } = await api.post("/signIn", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      setLoggedIn(true);
    } catch (error) {
      console.error("ログインエラー", error);
    } finally {
      setLoading(false);
    }
  };

  // ログアウト処理
  const signOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, signIn, signOut, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
