import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { OldMarket } from "../types/markets";



export function useV1Market() {
  const [markets, setMarkets] = useState<OldMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMarkets() {
      try {
        setLoading(true);
        const res = await axios.get<OldMarket[]>(
          "https://crypto-tracker-backend-xt56.onrender.com/api/oldmarkets",
          { signal: controller.signal }
        );
        
// console.log(res.data.filter(c=>c.stats===undefined))
        setMarkets(res.data);
        
        setLoading(false)
      } catch (err) {
                if ((err as AxiosError).name === "CanceledError") return;
        
        console.error("❌ Error fetching markets:", err);
        setError("Failed to fetch markets");
      }
    }

    fetchMarkets();
    return () => controller.abort();
  }, []);

  return { markets, loading, error };
}
