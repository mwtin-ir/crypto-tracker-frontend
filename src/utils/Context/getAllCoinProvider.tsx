import React, {
  useState,
  useContext,
  createContext,
  type ReactNode,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";
import type { Market } from "../types/markets";

type CoinContextValue = {
  coins: Market[];
  setCoins: React.Dispatch<React.SetStateAction<Market[]>>;
  loading: boolean;
};

export const CoinContext = createContext<CoinContextValue | undefined>(
  undefined
);

export function CoinsProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMarkets = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Market[]>(
          "https://crypto-tracker-backend-xt56.onrender.com/api/markets"
        );

        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        if ((err as AxiosError).name === "CanceledError") return;
        console.error("❌ Error fetching markets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
    return () => controller.abort();
  }, []);

  return (
    <CoinContext.Provider value={{ coins, setCoins, loading }}>
      {children}
    </CoinContext.Provider>
  );
}
export function useCoins() {
  const ctx = useContext(CoinContext);
  if (!ctx) throw new Error("useCoins must be used within <CoinsProvider />");
  return ctx;
}
