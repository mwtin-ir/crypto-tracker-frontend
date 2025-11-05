import React from "react";
import type { OldMarket } from "../../utils/types/markets";
import { fnum } from "../../utils/functional/formatNumber";
import { Link } from "react-router-dom";

const TradingMarket = ({ allCoin }: { allCoin: OldMarket[] }) => {
  return (
    <div className="bg-secondary p-6 rounded-2xl">
      <div className="flex flex-col gap-6 items-start">
        <h4 className="font-bold text-xl ">
          بازار های معاملاتی {allCoin[0]?.faBaseAsset}
        </h4>
        <table className="w-full  ">
          <thead className="">
            <tr className="text-right *:p-3 text-base font-medium text-subtle w-full *:w-1/4 ">
              <th>نام بازار</th>
              <th className="text-left md:text-right">اخرین قیمت</th>
              <th className="hidden md:table-cell ">ارزش معادلاتی 24H</th>
              <th className="hidden md:table-cell "></th>
            </tr>
          </thead>
          <tbody>
            {allCoin.map((coin) => (
              <TdTCoin key={coin.symbol} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradingMarket;
const TdTCoin = ({ coin }: { coin: OldMarket | null }) => {
  const isUSDT = coin?.symbol.includes("USDT");
  return (
    <tr className="text-right *:p-3 dark:hover:bg-gray-800/30 hover:bg-gray-200/30 cursor-pointer  rounded-md first:rounded-r-lg last:">
      <td className="rounded-r-lg">
        <div className="flex items-center gap-6">
          <div className="!relative">
            <img
              src={coin?.baseAsset_svg_icon}
              alt={coin?.baseAsset}
              className="w-[36px] h-[36px] "
            />
            <img
              src={coin?.quoteAsset_svg_icon}
              alt={coin?.faBaseAsset}
              className="absolute -bottom-2 -left-2  w-[22px] h-[22px] "
            />
          </div>
          <div className="flex flex-col gap-1 text-nowrap  ">
            <p className="text-base font-semibold">
              {coin?.faBaseAsset}
              <span className="text-subtle text-sm font-normal">
                /{isUSDT ? "تتر" : "تومان"}
              </span>
            </p>
            <p className="text-subtle text-sm">
              {coin?.baseAsset}/{isUSDT ? "USDT" : "IRT"}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-end md:items-start gap-1">
          <div className="flex items-center gap-1">
            <span className="text-base font-medium">
              {fnum(coin?.stats.lastPrice)}
            </span>
            <p className="text-sm text-subtle ">{isUSDT ? "USDT" : "IRT"}</p>
          </div>
          <span
            className={`${
              (coin?.stats["24h_ch"] ?? 0) >= 0
                ? "text-green-600 "
                : "text-red-600 "
            } text-sm `}
          >
            {fnum(Math.abs(Number(coin?.stats["24h_ch"])))}%
          </span>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1">
          <span className="text-base font-medium">
            {fnum(coin?.stats["24h_volume"])}
          </span>
          <p className="text-sm text-subtle ">{coin?.baseAsset}</p>
        </div>
      </td>
      <td className="hidden md:table-cell rounded-l-lg">
        <div className="flex  justify-center  text-nowrap">
          <Link
            to={"#"}
            className="text-green-800 tet-base font-medium p-3 border-l  border-gray-200 dark:border-gray-800 "
          >
            خرید و فروش
          </Link>
          <span className="h-full w-1 bg"></span>
          <Link to={"#"} className="text-green-800 tet-base font-medium p-3 ">
            خرید آسان
          </Link>
        </div>
      </td>
    </tr>
  );
};
