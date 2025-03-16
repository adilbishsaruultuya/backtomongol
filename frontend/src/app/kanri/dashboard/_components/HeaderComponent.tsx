"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/kanri/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Header() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  if (!auth?.user) return null; // ログインしていない場合は表示しない

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* 左側：ナビゲーションメニュー */}
      <div className="flex-1">
        <a className="text-xl font-bold">ダッシュボード</a>
      </div>

      {/* 右側：ユーザー名 & ドロップダウンメニュー */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            {auth.user.name}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <button onClick={auth.signOut} className="text-red-500">
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
