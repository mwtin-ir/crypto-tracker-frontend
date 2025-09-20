import { useEffect, useMemo, useState } from "react";
import { useV1Market } from "./useV1Market";
import type { OldMarket } from "../types/markets";
import axios from "axios";

export function useFilteredCoins(limit: number = 10) {
  const { markets } = useV1Market();

  const [trending, setTrending] = useState<(OldMarket & { rank: number })[]>(
    []
  );
  const topGainers = useMemo(() => {
    return markets
      .filter(
        (c) =>
          typeof c.stats?.["24h_ch"] === "number" && c.symbol.includes("TMN")
      )
      .sort(
        (a, b) =>
          (b.stats!["24h_ch"] as number) - (a.stats!["24h_ch"] as number)
      )
      .slice(0, limit);
  }, [markets, limit]);
  const topLoses = useMemo(() => {
    return markets
      .filter(
        (c) =>
          typeof c.stats?.["24h_ch"] === "number" && c.symbol.includes("TMN")
      )
      .sort(
        (a, b) =>
          (a.stats!["24h_ch"] as number) - (b.stats!["24h_ch"] as number)
      )
      .slice(0, limit);
  }, [markets, limit]);
  useEffect(() => {
    async function getTrend() {
      try {
        const res = await axios.get(
          `https://crypto-tracker-backend-xt56.onrender.com/markets/trending?limit=${limit}&currency=TMN`
        );
        setTrending(res.data);
      } catch (err) {
        console.error("Failed to fetch trending markets:", err);
      }
    }

    getTrend();
  }, [limit]);

  const newCoins = useMemo(() => {
    return markets
      .filter((c) => c.createdAt && c.symbol.includes("TMN"))
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      )
      .slice(0, limit);
  }, [markets, limit]);

  return { topGainers, newCoins, trending, topLoses };
}
