import React, { useEffect, useState } from "react";

import axios from "axios";
import type { OldMarket } from "../../utils/types/markets";
import { useFilteredCoins } from "../../utils/custom-hook/useFilteredCoins";
import { Link } from "react-router-dom";
import { fnum } from "../../utils/functional/formatNumber";
import { WestOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

function SwiperCard({ symbol }: { symbol: string }) {
  const { trending, topGainers, topLoses } = useFilteredCoins(7);
  const [related, setRelated] = useState<OldMarket[] | null>(null);
  console.log(trending);
  async function getRelated(): Promise<void> {
    try {
      const response = await axios.get(
        `https://crypto-tracker-backend-xt56.onrender.com/related/coin/${symbol}`
      );
      setRelated(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err, "Error fetching related coins");
    }
  }

  useEffect(() => {
    getRelated();
  }, [symbol]);

  const tabs = ["ارزهای محبوب", "ارز های مشابه", "بیشترین سود", "بیشترین ضرر"];
  const [activeIndex, setActiveIndex] = useState(0);
  const tabContents = [trending, related?.slice(0, 7), topGainers, topLoses];

  const activeContent = tabContents[activeIndex] ?? trending;

  return (
    <div className="py-8 px-4 md:py-8 bg-secondary rounded-2xl ">
      <div className=" flex flex-col gap-10 items-center md:items-center">
        <ul className="flex items-center gap-2    md:gap-5 lg:gap-6   ">
          {tabs.map((liE) => (
            <li
              key={tabs.indexOf(liE)}
              onClick={() => setActiveIndex(tabs.indexOf(liE))}
              className={`text-sm md:text-base font-medium text-nowrap border p-2 rounded-xl  ${
                activeIndex != tabs.indexOf(liE)
                  ? "text-subtle"
                  : "bg-gray-200 dark:bg-gray-800 "
              }`}
            >
              {liE}
            </li>
          ))}
        </ul>
        <div className="grid  grid-cols-1 md:grid-cols-2   lg:grid-cols-3 xl:grid-cols-4 grid-rows-2 w-full gap-8 items-center justify-center">
          {activeContent.map((coin) => (
            <Link
              key={coin.symbol}
              to={`/coin/${coin.symbol}?baseAsset=${coin.baseAsset}&name=${coin.faName}`}
              className="flex flex-col gap-2 items-start justify-center p-4 border border-gray-200 rounded-lg hover:scale-105 hover:shadow-md hover:bg-green-600/12"
            >
              <div className="flex items-center justify-between w-full">
                <img
                  src={coin.baseAsset_svg_icon}
                  alt={coin.baseAsset}
                  className="w-[36px] h-[36px] object-cover "
                />
                <h4 className="text-xl font-bold ">
                  {coin.faBaseAsset}{" "}
                  <span className="text-base text-subtle ">
                    {coin.baseAsset}
                  </span>
                </h4>
              </div>
              <div className="flex items-center justify-between w-full ">
                <span className="text-lg font-semibold ">
                  <span className="text-base text-subtle">تومان </span>
                  {fnum(coin?.stats.lastPrice)}
                </span>

                <span
                  className={`text-md font-semibold ${
                    Number(coin.stats["24h_ch"]) >= 0
                      ? "text-green-500"
                      : "text-red-600"
                  }`}
                >
                  {fnum(Math.abs(coin.stats["24h_ch"]))}%
                </span>
              </div>
            </Link>
          ))}
          <Button
            href="/markets"
            variant="outlined"
            color="success"
            sx={{
              height: "100%",
              minHeight: "80px",
              padding: "8px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              fontFamily: "inherit",
              fontSize: "16px",
              fontWeight: "600",
              gap: "4px",
              borderRadius: "8px",
            }}
          >
            <p>خرید ارز دیجیتال</p>
            <WestOutlined fontSize="medium" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
