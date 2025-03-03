import { api } from "@/common";

export const fetchTestData = async () => {
  try {
    const response = await api.get("/test");
    return response.data;
  } catch (error) {
    console.error("❌ API fetch error:", error);
    throw error;
  }
};
