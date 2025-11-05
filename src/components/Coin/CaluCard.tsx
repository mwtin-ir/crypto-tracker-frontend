import React, { useEffect, useState, type ChangeEvent } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Button } from "@mui/material";
import useLiveCoin from "../../utils/custom-hook/useLiveCoin";
import type { OldMarket } from "../../utils/types/markets";
import { fnum } from "../../utils/functional/formatNumber";
import SelectCurrencyBox from "./SelectCurrencyBox";
import { useTheme } from "../../utils/Context/ThemeProvider";

function CaluCard({
  coinTMN,
  coinUSDT,
  
  baseAsset,
}: {
  coinTMN: OldMarket | null;
  coinUSDT: OldMarket | null;
  
  baseAsset: string;
}) {
  const [currencyValue, setCurrencValue] = useState<string>("");
const [currency, setCurrency] = useState<"TMN" | "USDT">("TMN");
  const [CoinValue, setCoinValue] = useState<string>("");
  const { coin: coinUSDTLive } = useLiveCoin(`${baseAsset?.toUpperCase()}USDT`);
  const { coin: coinTMNLive } = useLiveCoin(`${baseAsset?.toUpperCase()}TMN`);
const {theme}=useTheme()
useEffect(()=>{
    setCoinValue("")
    setCurrencValue("")
},[currency])



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
      const selectedPrice = currency==="TMN" ? coinTMNLive?.price ?? coinTMN?.stats.lastPrice ?? 0 : coinUSDTLive?.price ?? coinUSDT?.stats.lastPrice ?? 0;
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

  const handleCoinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();

    // 1. تبدیل اعداد فارسی به انگلیسی + جداکننده اعشار به نقطه
    const persianToEnglish = (str: string) =>
      str
        .replace(/[۰-۹]/g, (d) => "0123456789"["۰۱۲۳۴۵۶۷۸۹".indexOf(d)])
        .replace(/[,٫]/g, ".");

    // 2. حذف هر چیزی جز عدد و نقطه
    let cleaned = persianToEnglish(input).replace(/[^0-9.]/g, "");

    // 3. نگه داشتن فقط اولین نقطه اعشار
    const [integerPart, ...decimalParts] = cleaned.split(".");
    if (decimalParts.length > 0) {
      cleaned = integerPart + "." + decimalParts.join("");
    }

    // 4. اگر ورودی خالی بود
    if (!cleaned) {
      setCoinValue("");
      setCurrencValue("");
      return;
    }

    // 5. برگرداندن مقدار فارسی برای input
    const englishToPersian = (str: string) =>
      str.replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]).replace(".", "٫");

    setCoinValue(englishToPersian(cleaned));

    // 6. محاسبات عددی
    const num = Number(cleaned);
    if (!isNaN(num)) {
      // fractionDigits داینامیک
      let fractionDigits = 12;
      if (num >= 1_000 && num < 10_000) fractionDigits = 10;
      else if (num >= 10_000 && num < 100_000) fractionDigits = 8;
      else if (num >= 100_000 && num < 1_000_000) fractionDigits = 6;
      else if (num >= 1_000_000 && num < 10_000_000) fractionDigits = 4;
      else if (num >= 10_000_000 && num < 100_000_000) fractionDigits = 3;
      else if (num >= 100_000_000 && num < 1_000_000_000) fractionDigits = 2;
      else if (num >= 1_000_000_000) fractionDigits = 1;

      const selectedPrice = coinTMNLive?.price ?? coinTMN?.stats.lastPrice ?? 0;
      const coinPrice =
        currency === "TMN"
          ? num * Number(selectedPrice)
          : num * Number(coinUSDTLive?.price ?? coinUSDT?.stats.lastPrice ?? 0);

      setCurrencValue(
        coinPrice.toLocaleString("fa-IR", {
          minimumFractionDigits: 0,
          maximumFractionDigits: fractionDigits,
        })
      );
    }
  };

  return (
    <div className="p-6 bg-gradient-to-t from-gray-200/90 to-gray-200/30  dark:from-green-900/55 dark:to-green-600/60 rounded-2xl min-w-[400px] row-span-2 shadow-xl">
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
          <div className="flex items-center rounded-xl bg-black/10 backdrop-blur-xl border border-white/20 z-40 lg:min-h-[60px]">
            <div className="flex items-center gap-2 p-3">
              <img
                src={
                  currency === "TMN"
                    ? coinTMN?.quoteAsset_svg_icon
                    : coinUSDT?.quoteAsset_svg_icon
                }
                alt={coinTMN?.baseAsset}
              />
              <SelectCurrencyBox setCurrency={setCurrency} currency={currency}/>
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
          <div className="flex items-center rounded-xl bg-black/10 backdrop-blur-xl border border-white/20 min-h-[60px]">
            <div className="flex items-center gap-2 p-3">
              <img src={coinTMN?.baseAsset_svg_icon} alt={coinTMN?.baseAsset} />
              <p>{coinTMN?.baseAsset}</p>
            </div>
            <div className="p-1 w-full z-0  ">
              <input
                type="text"
                value={CoinValue}
                onChange={handleCoinValue}
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
            
            sx={{
              padding: "12px 10px",
              fontFamily: "IRANSansX",
              fontSize: "16px",
              borderRadius: "12px",
              color:"white",
              bgcolor: theme==="dark" ? "#357a38" : "black"
            }}
          >
            خرید آسان {coinTMN?.faBaseAsset}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CaluCard;
