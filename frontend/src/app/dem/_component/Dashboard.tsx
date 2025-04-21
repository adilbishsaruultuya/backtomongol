"use client";
import React from "react";
import { useAuth } from "../_providers/AuthProvider";
import { useData } from "../_providers/DataProvider";
import ArticleTable from "./ArticleTable";

export default function Dashboard() {
  const { loading, setLoading } = useAuth();
  const { articles, categories } = useData();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {articles && <div>{articles[0].title.mn}</div>}
      <div>dashboard</div>

      <ArticleTable articles={articles ?? []} categories={categories ?? []} />
    </div>
  );
}
