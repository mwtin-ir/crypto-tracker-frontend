import axios from "axios";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { OldMarket } from "../utils/types/markets";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import useLiveCoin, { type CoinPrice } from "../utils/custom-hook/useLiveCoin";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fnum } from "../utils/functional/formatNumber";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useTheme } from "../utils/Context/ThemeProvider";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Button, Skeleton } from "@mui/material";
import SwiperCard from "../components/Coin/Swiper";
function Coin() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const coinRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [coinTMN, setCoinTMN] = useState<OldMarket | null>(null);
  const [coinUSDT, setCoinUSDT] = useState<OldMarket | null>(null);
  const [currency, setCurrency] = useState<"TMN" | "USDT">("TMN");
  const [searchParam] = useSearchParams();
  const baseAssetParam = searchParam.get("baseAsset");
  const { coin: coinTMNLive } = useLiveCoin(
    `${baseAssetParam?.toUpperCase()}TMN`
  );
  const { coin: coinUSDTLive } = useLiveCoin(
    `${baseAssetParam?.toUpperCase()}USDT`
  );

  const selectedCoin = currency === "TMN" ? coinTMNLive : coinUSDTLive;

  const options = [
    { value: "TMN", label: "تومان" },
    { value: "USDT", label: "USD ($)" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (coinRef.current && !coinRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  useEffect(() => {
    async function getCoin() {
      if (!baseAssetParam) return;

      try {
        setLoading(true);
        const { data } = await axios.get<OldMarket[]>(
          `https://crypto-tracker-backend-xt56.onrender.com/coin/${baseAssetParam}`
        );

        const tmnCoin = data.find((coin) =>
          coin.symbol.toUpperCase().endsWith("TMN")
        );
        const usdtCoin = data.find((coin) =>
          coin.symbol.toUpperCase().endsWith("USDT")
        );

        setCoinTMN(tmnCoin ?? null);
        setCoinUSDT(usdtCoin ?? null);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch coin:", err);
        setCoinTMN(null);
        setCoinUSDT(null);
      }
    }

    getCoin();
  }, [baseAssetParam]);

  function handelCurrency(currency: "TMN" | "USDT") {
    setCurrency(currency);
  }
  console.log(selectedCoin);
  return (
    <main className="px-2 md:px-0  ">
      <section className="container mx-auto flex flex-col gap-4 lg:gap-7 md:py-12">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8  ">
              <div className="lg:col-span-2   flex flex-col gap-6 ">
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
                  <div
                    className="relative flex items-center px-4 py-2 gap-4 bg-secondary    border border-gray-300 rounded-md  "
                    onClick={() => setOpen((P) => !P)}
                  >
                    <ExpandMoreIcon className="flex items-center justify-center pointer-events-none order-2 " />
                    <p className="">{currency === "TMN" ? "تومان" : "USD"}</p>
                    {open && (
                      <div
                        className="absolute top-[105%] flex items-center flex-col   w-full  right-0 rounded-sm bg-secondary  overflow-auto "
                        ref={coinRef}
                      >
                        {options.map((option) => {
                          return (
                            <div
                              key={option.label}
                              className={`${
                                currency === option.value &&
                                "bg-gray-200 dark:bg-gray-700"
                              } w-full  p-2`}
                              onClick={() =>
                                handelCurrency(option.value as "TMN" | "USDT")
                              }
                            >
                              {option.label}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-1">
                        <p className="font-black text-xl lg:text-2xl ">
                          {selectedCoin
                            ? fnum(selectedCoin?.price)
                            : currency === "TMN"
                            ? fnum(coinTMN?.stats.lastPrice)
                            : coinUSDT
                            ? fnum(coinUSDT?.stats.lastPrice)
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
                        } p-1 rounded-lg text-sm lg:text-xl font-semibold text-center flex items-center`}
                      >
                        {(currency === "TMN" && coinTMN ? "%" : "") ||
                          (!coinUSDT ? "" : "%")}{" "}
                        {selectedCoin
                          ? fnum(selectedCoin?.["24h_ch"])
                          : currency === "TMN"
                          ? fnum(coinTMN?.stats["24h_ch"])
                          : coinUSDT?.stats["24h_ch"]}
                        {(selectedCoin?.["24h_ch"] as number) >= 0 && " +"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full  lg:h-[450px] hidden lg:block ">
                  <AdvancedRealTimeChart
                    symbol={coinUSDT ? coinUSDT.symbol : "USDTUSD"}
                    locale="en"
                    hide_side_toolbar={true}
                    hide_top_toolbar={true}
                    hide_legend={true}
                    studies={[]}
                    timezone="Asia/Tehran"
                    style={"3"}
                    autosize
                    interval="1"
                    theme={theme}
                  
                  />
                </div>
              </div>
              <div className="col-span-1 self-start justify-center gap-4   flex flex-col items-center  lg:gap-11  ">
                <div className="p-4 rounded-md border border-gray-300  dark:border-gray-700 w-full">
                  <div className="flex flex-col justify-center gap-3 ">
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
                        <p>${fnum(coinUSDT?.stats["24h_highPrice"])}</p>
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
                        <p>${fnum(coinUSDT?.stats["24h_lowPrice"])}</p>
                        <p className="text-sm text-subtle ">تتر</p>
                      </div>
                    </div>
                  </div>
                </div>
                <CaluCard
                  coinTMN={coinTMN}
                  coinUSDT={coinUSDT}
                  currency={currency}
                  coinTMNLive={coinTMNLive}
                  coinUSDTLive={coinUSDTLive}
                />
              </div>
              <div className="w-full h-[350px] lg:h-[450px] lg:hidden block ">
                <AdvancedRealTimeChart
                  symbol={coinUSDT ? coinUSDT?.symbol : "USDTUSD"}
                  autosize
                  theme={theme}
                  hide_side_toolbar={true}
                  hide_top_toolbar={true}
                  hide_legend={true}
                  studies={[]}
                  timezone="Asia/Tehran"
                  style={"3"}
                  interval="1"
                />
              </div>
            </div>
                    <div className="w-full my-8 ">
          <SwiperCard symbol={coinTMN?.symbol as string} />
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

function CaluCard({
  coinTMN,
  coinUSDT,
  currency,
  coinUSDTLive,
  coinTMNLive,
}: {
  coinTMN: OldMarket | null;
  coinUSDT: OldMarket | null;
  currency: "TMN" | "USDT";
  coinUSDTLive: CoinPrice | null;
  coinTMNLive: CoinPrice | null;
}) {
  const [currencyValue, setCurrencValue] = useState<string>("");

  const [CoinValue, setCoinValue] = useState<string>("");

  const handleCurrencyValue = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const onlyNumbers = input.replace(/[^0-9۰-۹]/g, "");

    const eng = onlyNumbers.replace(
      /[۰-۹]/g,
      (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)]
    );

    const num = Number(eng);
    if (!isNaN(num)) {
      let fractionDigits = 12;
      if (num >= 1_000 && num < 10_000) fractionDigits = 10;
      else if (num >= 10_000 && num < 100_000) fractionDigits = 8;
      else if (num >= 100_000 && num < 1_000_000) fractionDigits = 6;
      else if (num >= 1_000_000 && num < 10_000_000) fractionDigits = 4;
      else if (num >= 10_000_000 && num < 100_000_000) fractionDigits = 3;
      else if (num >= 100_000_000 && num < 1_000_000_000) fractionDigits = 2;
      else if (num >= 1_000_000_000) fractionDigits = 1;

      setCurrencValue(num.toLocaleString("fa-IR"));
      const selectedPrice = coinTMNLive?.price ?? coinTMN?.stats.lastPrice;
      const setCoinPrice = Number(eng) / Number(selectedPrice);
      setCoinValue(
        setCoinPrice.toLocaleString("fa-IR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: fractionDigits,
        })
      );
    } else {
      setCurrencValue("");
    }
  };
  return (
    <div className="p-6 bg-gradient-to-t from-gray-300/90 to-gray-200/40  dark:from-green-900/65 dark:to-green-600/70 rounded-xl min-w-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full items-center justify-start gap-2">
          <div className="flex items-center justify-start">
            <CalculateIcon fontSize="large" />
          </div>
          <div className="flex items-start flex-col justify-start ">
            <h4 className="font-semibold">ماشین حساب {coinTMN?.faBaseAsset}</h4>
            <p className="font-medium text-subtle ">
              تبدیل {coinTMN?.faBaseAsset} به تومان و دلار
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full ">
          <div className="flex items-center rounded-xl bg-black/10 backdrop-blur-xl border border-white/20">
            <div className="flex items-center gap-2 p-3">
              <img
                src={coinTMN?.quoteAsset_svg_icon}
                alt={coinTMN?.baseAsset}
              />
              <p>{currency}</p>
            </div>
            <div className="p-1 w-full ">
              <input
                type="text"
                value={currencyValue}
                onChange={handleCurrencyValue}
                dir="ltr"
                className="w-full outline-none border-none bg-[unset]"
              />
            </div>
          </div>
          <div className="flex items-center rounded-xl bg-black/10 backdrop-blur-xl border border-white/20">
            <div className="flex items-center gap-2 p-3">
              <img src={coinTMN?.baseAsset_svg_icon} alt={coinTMN?.baseAsset} />
              <p>{coinTMN?.baseAsset}</p>
            </div>
            <div className="p-1 w-full ">
              <input
                type="text"
                value={CoinValue}
                // onChange={handleCurrencyValue}
                dir="ltr"
                className="w-full outline-none border-none bg-[unset]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 text-[13px] text-subtle">
            <p>
              قیمت {coinTMN?.faBaseAsset} به تومان برابر است با :{" "}
              {coinTMNLive
                ? fnum(coinTMNLive?.price)
                : fnum(coinTMN?.stats.lastPrice)}
            </p>
            <p>
              قیمت {coinTMN?.faBaseAsset} به تتر برابر است با :{" "}
              {coinUSDTLive
                ? fnum(coinUSDTLive?.price)
                : fnum(coinUSDT?.stats.lastPrice)}
            </p>
          </div>
          <Button
            variant="contained"
            className=" "
            color="success"
            sx={{
              padding: "12px 10px",
              fontFamily: "IRANSansX",
              fontSize: "16px",
              borderRadius: "12px",
              bgcolor: "bg-red-600",
            }}
          >
            خرید آسان {coinTMN?.faBaseAsset}
          </Button>
        </div>
      </div>
    </div>
  );
}
