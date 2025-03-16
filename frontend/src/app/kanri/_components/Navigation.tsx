"use client";

import { useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/kanri/providers/AuthProvider";
import { FileText, User, LogOut } from "lucide-react";

interface NavigationProps {
  children: ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth?.user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      {/* ヘッダー */}
      <div className="flex justify-between items-center bg-base-100 p-4 shadow-md mb-4">
        {/* 左側: ロゴ */}
        <div className="flex items-center space-x-2">
          <FileText size={28} className="text-primary" />
          <h1 className="text-2xl font-semibold hidden md:block">
            Admin Panel
          </h1>
          {/* PC (`md` 以上) では表示 / タブレット以下 (`md` 未満) では非表示 */}
        </div>

        {/* 右側: ユーザー情報 */}
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost flex items-center space-x-2">
            <User size={24} strokeWidth={2.5} className="text-gray-700" />
            <span className="text-lg font-semibold hidden sm:block">
              {auth.user.name}
            </span>
            {/* タブレット (`sm` 以上) では表示 / iPhone SE (`sm` 未満) では非表示 */}
          </button>
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={auth.signOut}>
                <LogOut size={18} className="mr-2" /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
