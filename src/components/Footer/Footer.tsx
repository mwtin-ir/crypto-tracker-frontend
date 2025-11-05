import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import usePersianDigits from "../../utils/custom-hook/usePersianDigits";

function Footer() {
  const [date, setDate] = useState<string | null>(null);
  const toPersianDigits = usePersianDigits();
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const persianDate = new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        calendar: "persian",
      }).format(now);
      setDate(persianDate);
    };

    const setDates = setInterval(updateDate, 1000);

    updateDate();

    return () => clearInterval(setDates);
  }, []);

  return (
    <footer className="  container mx-auto px-16  ">
      <div className="flex items-center justify-center lg:justify-start my-8  lg:my-12 ">
        <Link
          to="/"
          className="!font-[Irancell1] py-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 font-bold text-3xl xl:text-4xl "
        >
          Macoin
        </Link>
      </div>
      <nav className="">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-nowrap">
          <FooterItem
            title="معامله"
            items={["نقشه بازار", "لیست قیمت‌ها", "اسپات"].reverse()}
          />
          <FooterItem
            title="خرید ارزهای دیجیتال"
            items={[
              "خرید ارز دیجیتال",
              "خرید بیت کوین",
              "خرید تتر",
              "خرید اتریوم",
              "خرید تون‌کوین",
              "خرید دوج‌کوین",
            ]}
          />
          <FooterItem
            title="قیمت ارزهای دیجیتال"
            items={[
              "خرید ارز دیجیتال",
              "خرید بیت کوین",
              "خرید تتر",
              "خرید اتریوم",
              "خرید تون‌کوین",
              "خرید دوج‌کوین",
            ]}
          />
          <FooterItem
            title=" درباره ماکوین "
            items={["درباره‌ ما", "تماس با ما", "قوانین و مقررات","پشتیبانی آنلاین","دانلود اپلیکیشن"]}
          />
        </ul>
      </nav>
      <div
        className="flex flex-col gap-4 lg:flex-row items-center justify-between border-t border-gray-300 mt-6 py-4 col-span-5
      "
      >
        <div className="flex flex-col lg:flex-row items-center lg:gap-4">
          <div className="flex items-center gap-2 text-[12px] font-medium px-3 py-2">
            <p>حجم معامله در {toPersianDigits("24")} ساعت اخیر</p>
            <span className="font-bold">
              {toPersianDigits("9,088,433,553")}
            </span>
            <p>دلار</p>
          </div>
          <div className="px-3 py-2">{date}</div>
        </div>
        <p className="text-[11px] lg:text-sm">
          &copy; 2025{" "}
          <strong className="font-semibold text-green-600">Makooin</strong>. همه
          حقوق محفوظ است.
          <span className="mx-2 text-gray-600">|</span>
          <span className="hover:underline">حریم خصوصی</span>
        </p>
      </div>
    </footer>
  );
}

interface FooterItemProps {
  title: string;
  items: string[];
}

const FooterItem = ({ title, items }: FooterItemProps) => {
  return (
    <li className="flex items-center gap-2 flex-col">
      <h4 className="text-lg text-green-700 border-b-2 border-gray-300 px-2 py-1">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 *:px-2 py-3 items-center">
        {items?.map((item, idx) => (
          <li key={idx} className="cursor-pointer text-base !hover:text-subtle  font-medium">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Footer;
