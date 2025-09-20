import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { CryptocurrencyData } from "../types/markets";

export function useCurrencyStats() {
  const [stats, setStats] = useState<CryptocurrencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        setLoading(true);
        const res = await axios.get<{ result: CryptocurrencyData[] }>(
          "https://crypto-tracker-backend-xt56.onrender.com/api/currencies/stats",
          { signal: controller.signal }
        );
        setStats(res.data.result);
      } catch (err) {
        if ((err as AxiosError).name === "CanceledError") return;
        console.error("❌ Error fetching currency stats:", err);
        setError("Failed to fetch currency stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    return () => controller.abort();
  }, []);

  return { stats, loading, error };
}
