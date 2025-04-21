// "use client";
// import { useData } from "@/common/provider/DataProvider";
// import { NavCategoryType } from "@/types/common.types";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [navCategories, setNavCategories] = useState<
//     NavCategoryType[] | undefined
//   >();
//   const { categories } = useData();
//   const pathname = usePathname();

//   useEffect(() => {
//     if (!categories) return;

//     const updatedCategories = categories.map((category) => ({
//       ...category,
//       path: `/${category.name.toLowerCase()}`,
//     }));

//     setNavCategories(updatedCategories);
//   }, [categories]);

//   return (
//     <nav className="navbar bg-base-100 shadow-md px-4">
//       {/* 左側: ロゴ */}
//       <div className="flex-1">
//         <Link href="/" className="text-xl font-bold">
//           MyNews
//         </Link>
//       </div>

//       {/* 中央: カテゴリー */}
//       <div className="hidden lg:flex gap-4">
//         {navCategories?.map((category) => (
//           <Link
//             key={category.name}
//             href={category.path}
//             className={`btn btn-ghost ${
//               pathname === category.path ? "btn-active" : ""
//             }`}
//           >
//             {category.name}
//           </Link>
//         ))}
//       </div>

//       {/* 右側: About Us / Contact */}
//       <div className="hidden lg:flex gap-4">
//         <Link href="/about" className="btn btn-ghost">
//           About Us
//         </Link>
//         <Link href="/contact" className="btn btn-ghost">
//           Contact
//         </Link>
//       </div>

//       {/* モバイルメニュー (ドロワー) */}
//       <div className="lg:hidden">
//         <button
//           className="btn btn-square btn-ghost"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* モバイル用ドロワーメニュー */}
//       {isOpen && (
//         <div className="absolute top-16 right-4 w-48 bg-base-100 shadow-lg rounded-lg p-2 z-50">
//           {navCategories?.map((category) => (
//             <Link
//               key={category.name}
//               href={category.path}
//               className="block btn btn-ghost w-full"
//               onClick={() => setIsOpen(false)}
//             >
//               {category.name}
//             </Link>
//           ))}
//           <hr className="my-2" />
//           <Link href="/about" className="block btn btn-ghost w-full">
//             About Us
//           </Link>
//           <Link href="/contact" className="block btn btn-ghost w-full">
//             Contact
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow">
      <ul className="flex justify-around p-4 text-sm">
        <li>
          <a href="#hero" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="#activities" className="hover:underline">
            活動
          </a>
        </li>
        <li>
          <a href="#documents" className="hover:underline">
            資料
          </a>
        </li>
        <li>
          <a
            href="#donation"
            className="text-red-500 font-bold hover:underline"
          >
            Donate
          </a>
        </li>
        <li>
          <a href="#partners" className="hover:underline">
            協力
          </a>
        </li>
        <li>
          <a href="#events" className="hover:underline">
            イベント
          </a>
        </li>
        <li>
          <a href="#news" className="hover:underline">
            ニュース
          </a>
        </li>
        <li>
          <a href="#members" className="hover:underline">
            メンバー
          </a>
        </li>
      </ul>
    </nav>
  );
}
