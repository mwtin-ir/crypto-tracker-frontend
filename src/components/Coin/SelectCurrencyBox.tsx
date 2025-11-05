import React, {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface SelectCB {
  currency: "USDT" | "TMN";
  setCurrency: Dispatch<SetStateAction<"USDT" | "TMN">>;
}
function SelectCurrencyBox({ setCurrency, currency }: SelectCB) {
  const [open, setOpen] = useState<boolean>(false);
  const coinRef = useRef<HTMLDivElement | null>(null);
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
  function handelCurrency(currency: "TMN" | "USDT") {
    setCurrency(currency);
  }
  return (
    <div
      className="relative flex items-center px-3 py-2 gap-2    border border-gray-200 rounded-2xl z-20 "
      onClick={() => setOpen((P) => !P)}
    >
      <ExpandMoreIcon className="flex items-center justify-center pointer-events-none order-2 " />
      <p className="">{currency === "TMN" ? "تومان" : "USD"}</p>
      {open && (
        <div
          className="absolute top-[120%] flex items-center flex-col   w-full  right-0 rounded-2xl   overflow-auto z-30 bg-secondary"
          ref={coinRef}
        >
          {options.map((option) => {
            return (
              <div
                key={option.label}
                className={`${
                  currency === option.value && "bg-gray-200 dark:bg-gray-700"
                } w-full  p-2`}
                onClick={() => handelCurrency(option.value as "TMN" | "USDT")}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectCurrencyBox;
