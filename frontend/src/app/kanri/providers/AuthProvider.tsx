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
  isLoggedIn: boolean;
  isLoading: boolean;
  admin: boolean;
  user: UserType | undefined;
  signIn: (props: SignInProps) => Promise<void>;
  getUser: () => Promise<void>;
  signOut: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const router = useRouter();

  // // GET USER
  const getUser = async () => {
    try {
      const res = await api.get("/getUser", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setUser({
        _id: res.data.id,
        name: res.data.name,
        role: res.data.role,
      });
      if (res.data.role == "admin") {
        setAdmin(true);
      }
      console.log("get user 実行 ok");
    } catch (error) {
      console.log("Can not get user", error);
    }
  };

  // SIGN IN
  const signIn = async (props: SignInProps) => {
    const { email, password } = props;
    setIsLoading(true);

    try {
      const { data } = await api.post("/signIn", {
        email,
        password,
      });
      const { token } = data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setRefresh((prev) => 1 - prev);
      router.push("/kanri/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError) {
          console.log("can not sign in: ", error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // SIGN OUT
  const signOut = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsLoggedIn(false);
    router.push("/kanri");
  };

  // USE EFFECT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsLoggedIn(true);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getUser();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isLoggedIn,
        signIn,
        signOut,
        user,
        getUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
