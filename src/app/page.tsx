"use client";

import { getHearApi } from "@/lib/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const fetchHearApiFucntion = async () => {
      try {
        const response = await getHearApi();
        console.log("Heart API Response:", response);
      } catch (error) {
        console.error("Error fetching Heart API:", error);
      }
    };

    fetchHearApiFucntion();
  }, []);
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
    </div>
  );
}
