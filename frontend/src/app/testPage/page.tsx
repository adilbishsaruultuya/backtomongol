"use client";
import { useEffect, useState } from "react";
import { fetchTestData } from "@/services";

interface TestData {
  id: string;
  test: string;
}

const fetchData = async () => {
  const response = await fetch("http://localhost:5000/test");
  const data = await response.json();
  return data;
};

export default function Home() {
  const [data, setData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
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
      <ul>{data && data.map((item) => <li key={item.id}>{item.test}</li>)}</ul>
    </div>
  );
}
