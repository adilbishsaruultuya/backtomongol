import { api } from "@/common";

export const fetchTestData = async () => {
  try {
    const response = await api.get("/api/test");
    console.log("✅ API Response:", response.data); //
    return response.data;
  } catch (error) {
    console.error("❌ API fetch error:", error);
    throw error;
  }
};
