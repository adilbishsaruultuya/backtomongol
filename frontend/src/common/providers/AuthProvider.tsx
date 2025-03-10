import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  role: "user" | "admin";
  token: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // 初回マウント時に localStorage からユーザー情報を読み込む
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ログイン処理
  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await res.json();
      const decodedToken = JSON.parse(atob(data.token.split(".")[1])); // JWT デコード

      const newUser = {
        id: decodedToken.id,
        role: decodedToken.role,
        token: data.token,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser)); // ユーザー情報を localStorage に保存
      router.push("/dashboard"); // ダッシュボードにリダイレクト
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Sign-in failed!");
    }
  };

  // ログアウト処理
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/signin"); // サインインページへリダイレクト
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
