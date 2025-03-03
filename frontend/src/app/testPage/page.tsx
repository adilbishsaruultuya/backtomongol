"use client";
import { useEffect, useState } from "react";
import { getA } from "@/service";
interface TestData {
  id: string;
  test: string;
}

export default function Home() {
  const [data, setData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getA();
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
