import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://backtomongol.onrender.com",
// });

console.log("✅ API URL (axios):", process.env.NEXT_PUBLIC_API_URL); // ← ここで確認

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ 環境変数を使う
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
