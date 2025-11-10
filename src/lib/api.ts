import { AxiosError } from "axios";
import apiClient from "./apiHepler";
import { HeartApiResponse } from "@/types/api";

export const getHeartApi = async (): Promise<HeartApiResponse> => {
  try {
    const response = await apiClient.get("heart/api.php?out=json");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const msg = error.response?.data?.message || error.message;
      throw new Error(msg);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
