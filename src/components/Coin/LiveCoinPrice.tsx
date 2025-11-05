import React from "react";

import type { OldMarket } from "../../utils/types/markets";

import { fnum } from "../../utils/functional/formatNumber";
import useLiveCoin from "../../utils/custom-hook/useLiveCoin";

interface CoinLive {
  baseAsset: string;
  coinTMN: OldMarket | null;
  coinUSDT: OldMarket | null;
}

function LiveCoinPrice({ baseAsset, coinTMN, coinUSDT }: CoinLive) {
  const { coin: coinUSDTLive } = useLiveCoin(`${baseAsset?.toUpperCase()}USDT`);
  const { coin: coinTMNLive } = useLiveCoin(`${baseAsset?.toUpperCase()}TMN`);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800   py-4 w-full ">
      <div className="flex flex-col gap-3 items-start">
        <p className="font-normal text-subtle text-base ">
          اخرین قیمت به تومان
        </p>
        <p className="font-bold text-lg flex items-center gap-1">
          <span className="font-medium ">تومان </span>
          {coinTMNLive
            ? fnum(coinTMNLive.price)
            : fnum(coinTMN?.stats.lastPrice)}
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <p className="font-normal text-subtle text-base ">اخرین قیمت به تتر</p>
        <p className={`font-bold text-lg flex items-center gap-1 `}>
          <span className="font-medium text-base">USDT</span>
          {coinUSDTLive
            ? fnum(coinUSDTLive?.price)
            : fnum(coinUSDT?.stats.lastPrice)}
        </p>
      </div>

      <div className="flex flex-col gap-3 items-center ">
        <p className="font-normal text-subtle text-base ">تغییر قیمت</p>
        <p
          className={`font-bold text-lg flex items-center gap-1 ${
            (coinTMNLive
              ? coinTMNLive?.["24h_ch"]
              : coinTMN?.stats["24h_ch"] ?? 12) >= 0
              ? "text-green-600" // مثبت
              : "text-red-600" // منفی
          }`}
        >
          <span className="font-medium ">%</span>
          {coinUSDTLive
            ? fnum(Math.abs(coinUSDTLive?.["24h_ch"]))
            : fnum(Math.abs(Number(coinTMN?.stats["24h_ch"])))}
        </p>
      </div>
      {/* <div className="flex items-center gap-1">
        <p className="font-black text-xl lg:text-2xl ">
          {selectedCoin
            ? fnum(selectedCoin?.price)
            : currency === "TMN"
            ? fnum(coinTMN?.stats.lastPrice)
            : coinUSDT
            ? fnum(coinUSDT?.stats.lastPrice, coinUSDT.stats.bidPrice)
            : 1}
        </p>
        <p className="font-medium text-subtle ">
          {currency === "TMN" ? `تومان` : "$"}
        </p>
      </div>
      <div
        className={`${
          (selectedCoin?.["24h_ch"] as number) >= 0
            ? " text-green-600 bg-green-600/20"
            : " text-red-600 bg-red-600/20  "
        } p-2 rounded-lg text-sm lg:text-xl font-semibold text-center flex items-center`}
      >
        {selectedCoin
          ? fnum(Math.abs(Number(selectedCoin?.["24h_ch"])))
          : currency === "TMN"
          ? fnum(Math.abs(Number(coinTMN?.stats["24h_ch"])))
          : coinUSDT?.stats["24h_ch"]}
        {(currency === "TMN" && coinTMN ? "%" : "") || (!coinUSDT ? "" : "%")}
      </div> */}
    </div>
  );
}

export default LiveCoinPrice;
