import { AxiosError } from "axios";
import apiClient from "./apiHepler";

// get heart api
export const getHearApi = async () => {
  try {
    const response = await apiClient.get(`heart/api.php`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      // Fallback for unknown errors
      return new Error("An unknown error occurred");
    }
  }
};
