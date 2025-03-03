"use client";
import { useEffect, useState } from "react";
import { api } from "@/common";
// import axios from "axios";

interface TestData {
  id: string;
  test: string;
}

// const fetchData = async () => {
//   console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
//   // const response = await api.get("/test");
//   // return response.data;
//   try {
//     const response = await api.get("/test");
//     console.log("✅ API Response:", response.data); //
//     return response.data;
//   } catch (error) {
//     console.error("❌ bolku baina:", error);
//     throw error;
//   }
// };

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // 正しい API のベースURL
// });

// データ取得関数
export const fetchTestData = async () => {
  try {
    // console.log("🔍 API URL:", process.env.NEXT_PUBLIC_API_URL);
    const response = await api.get("/test"); // /test でデータ取得
    console.log("hi:", response.config.baseURL);
    return response.data; // ✅ `response.data` を返す
  } catch (error) {
    console.error("❌ API fetch error:", error);
    throw error;
  }
};

export default function Home() {
  const [data, setData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchTestData();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Dame fetch:", error);
        setError("データの取得に失敗しました。");
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Test Data</h1>
      {error && <p className="text-red-500">{error}</p>} {/* エラーを表示 */}
      <ul>
        {data &&
          data.map((item, index) => (
            <li key={item.test + index}>{item.test}</li>
          ))}
      </ul>
    </div>
  );
}
