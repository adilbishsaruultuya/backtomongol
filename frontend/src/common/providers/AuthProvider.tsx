"use client";

import {
  SignInProps,
  SignUpProps,
  UserType,
  api,
  changePasswordType,
  userUpdatePasswordType,
  userUpdateProps,
} from "@/common";
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
import { Notify } from "..";
import { ToastContainer, toast } from "react-toastify";

type AuthContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: UserType | undefined;
  isAdmin: boolean;
  signUp: (props: SignUpProps) => Promise<void>;
  signIn: (props: SignInProps) => Promise<void>;
  userUpdate: (props: userUpdateProps) => Promise<void>;
  otpGenerate: (props: userUpdatePasswordType) => Promise<void>;
  changePassword: (props: changePasswordType) => Promise<boolean>;
  getUser: () => Promise<void>;
  signOut: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserType>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  // GET USER
  const getUser = async () => {
    try {
      const res = await api.get("/getUser", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setUser({
        address: res.data.address,
        email: res.data.email,
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        _id: res.data._id,
        avatar_url: res.data.avatar_url,
        role: res.data.role,
      });
      if (res.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {}
  };

  // SIGN UP
  const signUp = async (props: SignUpProps) => {
    const { name, address, email, password, phoneNumber } = props;
    setIsLoading(true);

    try {
      const { data } = await api.post("/signUp", {
        name,
        address,
        email,
        password,
        phoneNumber,
      });
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      router.push("/signIn");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message ?? error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      }
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

      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setRefresh((prev) => 1 - prev);
      router.push("/menu");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message ?? error.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // SIGN OUT
  const signOut = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    setUser(undefined);

    setIsLoggedIn(false);

    router.push("/signIn");
  };

  // USER UPDATE
  const userUpdate = async (props: userUpdateProps) => {
    const { email, name, phoneNumber, avatar_url } = props;
    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        "/userUpdate",
        {
          email,
          name,
          phoneNumber,
          avatar_url,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser({
        address: res.data.address,
        email: res.data.email,
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        avatar_url: res.data.avatar_url,
      });
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setRefresh((prev) => 1 - prev);
      router.push("/userProfile");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  // OTP GENERATE
  const otpGenerate = async (props: userUpdatePasswordType) => {
    const { email } = props;

    try {
      const { data } = await api.post("/otpGenerate", {
        email,
      });
      localStorage.setItem("email", email);

      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };
  // CHANGE PASSWORD
  const changePassword = async (props: changePasswordType) => {
    const { otp, email, newPassword } = props;

    try {
      const { data } = await api.post("/changePassword", {
        otp,
        email,
        newPassword,
      });
      localStorage.removeItem("otp");
      localStorage.removeItem("email");
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message ?? error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
      return false;
    }
  };

  // USE EFFECT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setIsLoggedIn(true);
    getUser();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getUser();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signIn,
        signUp,
        signOut,
        user,
        userUpdate,
        getUser,
        otpGenerate,
        changePassword,
        isAdmin,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
