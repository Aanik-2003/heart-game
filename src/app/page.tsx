"use client";

import { getHeartApi } from "@/lib/api";
import { HeartApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<HeartApiResponse | null>(null);
  useEffect(() => {
    const fetchHearApiFucntion = async () => {
      try {
        const response = await getHeartApi();
        console.log("Heart API Response:", response);
        setApiResponse(response);
      } catch (error) {
        console.error("Error fetching Heart API:", error);
      }
    };

    fetchHearApiFucntion();
  }, []);
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <span>Res: {apiResponse?.carrots}</span>
    </div>
  );
}
