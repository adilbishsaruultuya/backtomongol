"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import { useData } from "../providers/DataProvider";
import Navigation from "../_components/Navigation";
import StatusFilter from "./_components/StatusFilter";
import ArticleTable from "./_components/ArticleTable";
// import ArticleTable from "./_components/ArticleTable";
export default function DashBoard() {
  const { isLoading, isLoggedIn } = useAuth();
  const { articles, categories } = useData();
  const router = useRouter();
  if (!isLoggedIn) {
    console.log("dashboard !isLoggedIn");
    return;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {!articles || !categories ? (
        <div>No articles </div>
      ) : (
        <div>
          <ArticleTable articles={articles} categories={categories} />
        </div>
      )}
    </div>
  );
  // const [status, setStatus] = useState<string>("null");

  // const router = useRouter();

  // useEffect(() => {
  //   if (auth?.loading) return;
  //   if (!auth?.user) {
  //     router.push("/kanri");
  //   }
  // }, [auth?.loading, auth?.user, router]);

  // // ローディング中なら何も表示しない
  // if (auth?.loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!auth?.user) {
  //   return null;
  // }
  // return (
  //   <Navigation>
  //     <div>
  //       <StatusFilter status={status} setStatus={setStatus} />
  //       <h2 className="text-xl font-bold mb-4">Welcome to the Dashboard</h2>
  //       <button className="btn btn-primary">Dashboard Click Me</button>
  //       <ArticleTable />
  //     </div>
  //   </Navigation>
  // );
}
