"use client";
import { useContext, useEffect } from "react";
import { format } from "date-fns";
import { ArticleType, CategoryType, UserType } from "@/types/common.types";

const ArticleTable = ({
  articles,
  categories,
}: {
  articles: ArticleType[];
  categories: CategoryType[];
}) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown"; // カテゴリが見つからなければ "Unknown"
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">記事一覧</h2>

      {!articles ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500">記事がありません。</p>
      ) : (
        <table className="table w-full border rounded-lg shadow-md">
          {/* ヘッダー */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">タイトル</th>
              <th className="p-2">カテゴリ</th>
              <th className="p-2">公開日</th>
            </tr>
          </thead>

          {/* ボディ */}
          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="p-2">{article.title.mn}</td>
                <td className="p-2">{getCategoryName(article.category)}</td>
                <td className="p-2">
                  {format(new Date(article.createdAt ?? ""), "yyyy-MM-dd")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ArticleTable;
