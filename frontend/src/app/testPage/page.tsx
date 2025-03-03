"use client";
import { useEffect, useState } from "react";
import { api } from "@/common";

interface TestData {
  id: string;
  test: string;
}

export const fetchTestData = async () => {
  try {
    const response = await api.get("/test");
    return response.data;
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
