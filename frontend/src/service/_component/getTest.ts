import { api } from "@/common";

export const getA = async () => {
  try {
    const response = await api.get("/test");
    console.log("Zolzaya data get ok");
    return response.data;
  } catch (error) {
    console.error("❌ API fetch error:", error);
    throw error;
  }
};
