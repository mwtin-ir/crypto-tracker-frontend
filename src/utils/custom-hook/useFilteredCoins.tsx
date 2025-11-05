import { useMemo } from "react";
import { useV1Market } from "./useV1Market";

export function useFilteredCoins(limit: number = 10) {
  const { markets } = useV1Market();

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

  const trending = useMemo(() => {
    const trendCoin = markets
      .filter(
        (c) =>
          typeof c.stats?.["24h_ch"] === "number" && c.symbol.includes("TMN")
      )
      .sort((a, b) => {
        const volA = Number(a.stats?.["24h_quoteVolume"] ?? 0);
        const volB = Number(b.stats?.["24h_quoteVolume"] ?? 0);
        return volB - volA;
      })
      .slice(0, limit);

    return trendCoin;
  }, [markets, limit]);

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
