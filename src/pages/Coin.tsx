import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { OldMarket } from "../utils/types/markets";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { fnum } from "../utils/functional/formatNumber";
import { useTheme } from "../utils/Context/ThemeProvider";
import { IconButton, Skeleton } from "@mui/material";
import SwiperCard from "../components/Coin/Swiper";
import LiveCoinPrice from "../components/Coin/LiveCoinPrice";
import CaluCard from "../components/Coin/CaluCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TradingMarket from "../components/Coin/TradingMarket";

import TradingViewWidget from "../components/Coin/TradingViewWidget";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import Comments from "../components/Coin/comment/Comments";
import useTitle from "../utils/custom-hook/useTitle";
import TechAnalusis from "../components/Coin/TechAnalusis";
import handleShare from "../services/coin/share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  toggleLikeCoin,
  toggleBookmarkCoin,
} from "../services/coin/likeService";
import { useUser } from "../utils/Context/UserProvider";
interface CoinStats {
  like: boolean;
  bookmark: boolean;
}
function Coin() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [allCoins, setAllCoins] = useState<OldMarket[] | null>(null);
  const [coinTMN, setCoinTMN] = useState<OldMarket | null>(null);
  const [coinUSDT, setCoinUSDT] = useState<OldMarket | null>(null);
  const [searchParam] = useSearchParams();
  const [{ like, bookmark }] = useState<CoinStats>({
    like: false,
    bookmark: false,
  });
  const baseAssetParam = searchParam.get("baseAsset");
  const { user } = useUser();
  useEffect(() => {
    async function getCoin() {
      if (!baseAssetParam) return;

      try {
        setLoading(true);
        const { data } = await axios.get<OldMarket[]>(
          `https://crypto-tracker-backend-xt56.onrender.com/coin/${baseAssetParam}`
        );
        setAllCoins(data);
        const tmnCoin = data.find((coin) =>
          coin.symbol.toUpperCase().endsWith("TMN")
        );
        const usdtCoin = data.find((coin) =>
          coin.symbol.toUpperCase().endsWith("USDT")
        );
        if (tmnCoin) {
          const tether = { ...tmnCoin, symbol: "USDT" };
          setCoinUSDT(usdtCoin ?? tether);
        }
        setCoinTMN(tmnCoin ?? null);

        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch coin:", err);
        setCoinTMN(null);
        setCoinUSDT(null);
      }
    }

    getCoin();
  }, [baseAssetParam]);
  useTitle(`خرید ${coinTMN?.faBaseAsset}`);

  useEffect(() => {
    if (user && coinTMN) {
      console.log(user.likedCoins);
    }
  }, [user, coinTMN]);

  return (
    <main className="px-4 md:px-0  py-8">
      <section className="container mx-auto flex flex-col gap-12 ">
        {!loading ? (
          <>
            <div className="flex items-center gap-[1px] lg:gap-[3px]">
              <Link to={"/"} className="text-subtle text-sm  lg:text-base">
                خانه
              </Link>
              <KeyboardArrowLeftIcon fontSize="small" className="text-subtle" />
              <Link
                to={"/markets"}
                className="text-subtle text-sm  lg:text-base"
              >
                قیمت ارز های دیجیتال
              </Link>
              <KeyboardArrowLeftIcon fontSize="small" className="text-subtle" />
              <p className="font-medium text-center text-sm  lg:text-base">
                {coinTMN?.faBaseAsset}{" "}
                <span
                  className={`${
                    (coinTMN?.stats!["24h_ch"] ?? 0) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ({coinTMN?.baseAsset})
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center    gap-8  ">
              <div className="lg:col-span-2    flex flex-col gap-8 self-start">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2  ">
                    <img
                      src={coinTMN?.baseAsset_svg_icon}
                      alt={coinTMN?.enName}
                      className="object-cover w-9 h-9 lg:w-12 lg:h-12 "
                      draggable="false"
                      loading="lazy"
                    />
                    <p className="font-medium text-base lg:text-xl !font-[Irancell1]">
                      قیمت{" "}
                      <span className="!font-[Irancell1]">
                        {coinTMN?.faBaseAsset}
                      </span>
                    </p>
                    <p className="font-medium text-lg">
                      ({coinTMN?.baseAsset})
                    </p>
                  </div>

                  <div className="flex items-cetner gap-2">
                    <IconButton
                      onClick={() =>
                        toggleLikeCoin(
                          coinTMN?.symbol as string,
                          user?.id as string
                        )
                      }
                    >
                      {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        toggleBookmarkCoin(
                          coinTMN?.symbol as string,
                          user?.id as string
                        )
                      }
                    >
                      {bookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>

                    <IconButton onClick={handleShare}>
                      <ShareIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex items-center justify-between">
                    <LiveCoinPrice
                      coinTMN={coinTMN}
                      coinUSDT={coinUSDT}
                      baseAsset={baseAssetParam as string}
                    />
                  </div>
                </div>

                <TradingMarket allCoin={allCoins as OldMarket[]} />
              </div>
              <div className="col-span-1 self-start justify-center    flex flex-col items-center gap-8   ">
                <div className="p-4 rounded-2xl border border-gray-300  dark:border-gray-700 w-full lg:row-span-1">
                  <div className="flex flex-col justify-center  ">
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-1acf2jc"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#039874"
                            fillRule="evenodd"
                            d="M22.423 6.708a1 1 0 0 0-.923-.618h-4.909a1 1 0 1 0 0 2h2.494l-5.358 5.356-3.383-3.384c-.375-.375-1.038-.375-1.414 0l-6.138 6.14a1 1 0 0 0 1.415 1.415l5.43-5.433 3.382 3.383a1 1 0 0 0 1.415 0L20.5 9.503V12a1 1 0 1 0 2 0V7.09c0-.13-.027-.26-.077-.382"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <p className="font-medium text-base">بیشترین قیمت</p>
                        <p className="text-subtle font-medium text-base">
                          (۲۴ ساعت)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p>
                          $
                          {fnum(
                            coinUSDT?.stats?.["24h_highPrice"],
                            coinUSDT?.stats.bidPrice
                          )}
                        </p>
                        <p className="text-sm text-subtle ">تتر</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="none"
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-1eo8mck"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#F65555"
                            fillRule="evenodd"
                            d="M22.424 17.29a1 1 0 0 0 .076-.38V12a1 1 0 0 0-2 0v2.496l-6.067-6.063a1 1 0 0 0-1.414 0l-3.383 3.383-5.429-5.433a.999.999 0 1 0-1.414 1.414l6.136 6.14a1 1 0 0 0 1.414 0l3.383-3.383 5.36 5.356H16.59a1 1 0 1 0 0 2h4.91a1 1 0 0 0 .707-.293c.094-.094.167-.206.217-.327"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <p className="font-medium text-base">کمترین قیمت</p>
                        <p className="text-subtle font-medium text-base">
                          (۲۴ ساعت)
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p>
                          $
                          {fnum(
                            coinUSDT?.stats["24h_lowPrice"],
                            coinUSDT?.stats.bidPrice
                          )}
                        </p>
                        <p className="text-sm text-subtle ">تتر</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CaluCard
                  coinTMN={coinTMN}
                  coinUSDT={coinUSDT}
                  baseAsset={baseAssetParam as string}
                />
              </div>
              <div className="w-full h-[300px]  lg:hidden block bg-secondary p-4 rounded-2xl ">
                <TradingViewWidget
                  symbol={coinUSDT?.symbol as string}
                  theme={theme}
                />
              </div>
            </div>
            <div className="bg-secondary w-full  hidden  p-6 h-[460px] rounded-2xl md:flex flex-col gap-3">
              <p className="text-xl font-bold">
                نمودار قیمتی {coinTMN?.faBaseAsset}
              </p>
              <TradingViewWidget
                symbol={coinUSDT?.symbol as string}
                theme={theme}
              />
            </div>
            <div className="w-full flex flex-col gap-8  ">
              <SwiperCard symbol={coinTMN?.symbol as string} />
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-3 items-start gap-8  ">
              <Comments
                symbol={coinTMN?.symbol as string}
                coinName={coinTMN?.faBaseAsset as string}
              />
              <div className="lg:sticky top-[4rem] col-span-1 order-1 lg:order-2  transition-all duration-300 ease-in">
                <TechAnalusis
                  symbol={coinUSDT?.symbol as string}
                  theme={theme}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Skeleton
              variant="text"
              sx={{ width: { xs: "280px", md: "450px" }, height: "24px" }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8  ">
              <div className="lg:col-span-2   flex flex-col gap-6 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2  ">
                    <Skeleton
                      variant="circular"
                      sx={{
                        width: { xs: "36px", md: "48px" },
                        height: { xs: "36px", md: "48px" },
                      }}
                    />

                    <Skeleton
                      variant="text"
                      sx={{ width: { xs: "160px", md: "280px" } }}
                      height={48}
                    />
                  </div>

                  <Skeleton
                    variant="rounded"
                    sx={{ width: { xs: "90px", md: "90px" } }}
                    height={48}
                  />
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className=" items-center gap-1">
                        <Skeleton
                          variant="text"
                          sx={{ width: { xs: "180px", md: "250px" } }}
                          height={50}
                        />
                      </div>
                      <Skeleton
                        variant="rounded"
                        sx={{ width: { xs: "50px", md: "90px" } }}
                        height={40}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full  lg:h-[450px] hidden lg:block ">
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    sx={{ height: { xs: "366px", md: "450px" } }}
                  />
                </div>
              </div>
              <div className="col-span-1 self-start justify-center  flex flex-col items-center  lg:gap-11 ">
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  sx={{ height: { xs: "86px", md: "85.6px" } }}
                  className="self-center"
                />
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  sx={{ height: { xs: "350px", md: "450px" } }}
                  className="self-center"
                />
              </div>
              <div className="w-full h-[350px] lg:h-[450px] lg:hidden block ">
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  sx={{ height: { xs: "350px", md: "450px" } }}
                  className="self-center"
                />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Coin;
