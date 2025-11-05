import React from "react";
import WestIcon from "@mui/icons-material/West";
import Botton from "../Botton";
import { useTheme } from "../../utils/Context/ThemeProvider";
import usePersianDigits from "../../utils/custom-hook/usePersianDigits";
import CustomAccordion from "../Accordion";
import AcoordingContext from "../../utils/Context/AcoordingContext";
import { useFilteredCoins } from "../../utils/custom-hook/useFilteredCoins";
import { Link } from "react-router-dom";
import { useV1Market } from "../../utils/custom-hook/useV1Market";
import type { OldMarket } from "../../utils/types/markets";
import { Button } from "@mui/material";

const MainHome = () => {
  const { theme } = useTheme();
  const toPersianDigits = usePersianDigits();
  const { topGainers, newCoins, trending } = useFilteredCoins(5);
  const { loading } = useV1Market();
  return (
    <main className="w-full min-h-screen bg-[unset] ">
      <section className="w-full lg:px-16 container mx-auto  px-4 ">
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-center  py-12 w-full">
            <ShowCoinCard title="محبوب ترین ها" hook={trending} />
            <ShowCoinCard title="پر سود ترین‌ ها" hook={topGainers} />
            <ShowCoinCard
              title="جد‌ید ترین ارز‌ ها"
              hook={newCoins}
              className="hidden xl:flex"
            />
          </div>
        )}
        <div className="grid grid-cols-1  md:grid-cols-[2fr_1fr] gap-8 items-center fade-in">
          <div className=" flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">
                وقتشه! همین الان صرافی رمزارزی ما رو امتحان کن و وارد دنیای
                کریپتو شو!
              </h3>
              <p className="text-lg font-normal mb-5">
                شروع کن، ترید کن، تا ۱۱,۰۰۰ تتر جایزه ببر! 🚀💸
              </p>
              <button className="flex items-center gap-2 text-green-700 hover:scale-95 transition-transform duration-200">
                <span className="text-lg font-medium">
                  بیشتر بدون، بیشتر ببر!
                </span>
                <WestIcon fontSize="small" />
              </button>
            </div>
            <div className=" flex lg:hidden justify-center  md:justify-end">
              <img
                src="https://assets.staticimg.com/brisk-web/1.1.44/media/e5925544dfe54573cb46.png"
                alt="btc-coin"
                className="w-[300px] md:w-[364px] max-w-full"
              />
            </div>
            <div className=" w-full bg-green-300/10 backdrop-blur-lg px-4 lg:px-10  border border-green-600/30 rounded-3xl py-12">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl lg:text-2xl font-medium !font-[Irancell1]">
                    ثبت نام
                  </h4>
                  <Button
                    className=""
                    variant="contained"
                    color="success"
                    sx={{
                      fontSize: "1.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      borderRadius: "1rem",
                    }}
                  >
                    <Link to={"register/signup"}> ثبت نام</Link>
                    <WestIcon fontSize="medium" />
                  </Button>
                </div>
                <p className="text-subtle text-base">
                  همین الان بدون معطلی ۱۰۰ تتر پول نقد بگیر + ۴۰۰ تتر کوپن هدیه
                  بزن به جیب + ۱۰,۵۰۰ تتر سرمایه آزمایشی فیوچرز داشته باش و از
                  همون اول حس برنده بودن رو تجربه کن!
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex justify-center md:justify-end">
            <img
              src="https://assets.staticimg.com/brisk-web/1.1.44/media/e5925544dfe54573cb46.png"
              alt="btc-coin"
              className="w-[300px] md:w-[364px] max-w-full"
            />
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-transparent via-green-400/2 to-green-400/10 py-4 px-4 lg:px-12">
        <div className="container mx-auto lg:px-16">
          <h2 className="text-2xl text-center font-semibold !font-[Irancell1] my-10 ">
            محصولات و خدمات
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <ProductCard
              title="خرید رمزارز"
              dec="خرید آنلاین ارز دیجیتال با کارت شتاب و انتقال بانکی"
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/41432103ebf0db792049.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/6bb1ba23cae1615b0629.png"
            />
            <ProductCard
              title="معامله اسپات"
              dec="معامله ارز دیجیتال با مجموعه‌ای از ابزارهای قدرتمند برای حداکثر سود"
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/f8ad820627af40960f3d.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/5bfa417c7ae7f563978f.png"
            />{" "}
            <ProductCard
              title="دریافت ماکوین"
              dec="با استراتژی‌های امن و سودده، دارایی‌هات رو افزایش بده و درآمد مستمر داشته باش"
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/9fb5bfd9077f280559ab.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/595e62951aa915b7fa75.png"
            />{" "}
            <ProductCard
              title="معاملات حرفه‌ای کریپتو"
              dec="معاملات فیوچرز با کارمزد کم و نقدینگی بالا، تو بهترین صرافی کوین‌ها»"
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/f391d81106b0ed1bd99a.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/c577e3a0ffda0a9863b6.png"
            />{" "}
            <ProductCard
              title="معاملات با اهرم"
              dec="وام بگیر، معامله کن، و تسویه کن. با معاملات مارجین قدرت دارایی‌هات رو چند برابر کن"
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/60ecb24f14b7dcf07c0a.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/e1d6ffbf9b8fb1798697.png"
            />{" "}
            <ProductCard
              title="معامله با ربات"
              dec="سود سرمایه‌گذاری‌ات رو با خرید و فروش ساده توکن‌های اهرمی چند برابر کن."
              logo="https://assets.staticimg.com/brisk-web/1.1.51/media/c5042cebda7507342462.png"
              darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/e3618af0308c86c8da49.png"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 lg:px-16 ">
        <div className="flex items-center justify-center flex-col gap-4 my-10">
          {" "}
          <h2 className="text-2xl text-center font-semibold !font-[Irancell1]  ">
            امنیت کاربران در صرافی ارز دیجیتال ماکوین
          </h2>
          <Botton link="/" title="مشاهده بیشتر">
            <WestIcon />
          </Botton>
        </div>{" "}
      </section>
      <section className="container  mx-auto lg:px-16 px-4 overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-14 items-center ">
          <SecurCard
            title=" حفاظت و ذخیره‌سازی امن دارایی‌های دیجیتال"
            dec=" سیستم‌های رمزنگاری و ذخیره‌سازی پیشرفته ما تضمین می‌کنن که دارایی‌هات
        همیشه امن و محفوظ بمونه."
            img="https://assets.staticimg.com/brisk-web/1.1.45/media/765dd1ff21911627b452.png"
            darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/0aa6ac72fd98b4d39b43.png"
          />

          <SecurCard
            title=" پلتفرم قابل اعتماد"
            dec="زیرساخت ما از پایه امن طراحی شده تا هر حمله سایبری رو سریع شناسایی و پاسخ بده.
        "
            img="https://assets.staticimg.com/brisk-web/1.1.51/media/ba61edcfc76c171abb5f.png"
            darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/721d415312f6e292adf7.png"
          />
          <SecurCard
            title="شفافیت دارایی‌ها با اثبات ذخایر"
            dec="با اثبات ذخایر (PoR) مطمئن باش ماکوین همه دارایی کاربران رو به‌طور کامل پوشش می‌ده."
            img="https://assets.staticimg.com/brisk-web/1.1.51/media/387107bcec6483b7b805.png"
            darkLogo="https://assets.staticimg.com/brisk-web/1.1.51/media/f641e91a08c0a5a2ee1e.png"
          />
        </div>
      </section>
      <section className=" container mx-auto my-12 lg:my-12 xl:mt-90 h-[615px] lg:h-[550px] ">
        <div className=" flex flex-col lg:flex-row items-center px-16  ">
          <img
            src="https://assets.staticimg.com/brisk-web/1.1.45/media/f8fcf8b7226c2cf4365e.png"
            alt=""
            className="absolute hidden lg:inline-block  left-0 w-[340px] md:w-[766px] lg:opacity-40 xl:opacity-100 z-0  lg:blur xl:blur-none"
            loading="lazy"
            draggable={false}
          />
          <div className=" flex order-2 mt-10 lg:mt-0 lg:hidden">
            <div className="absolute  left-0  ">
              <img
                src="https://assets.staticimg.com/brisk-web/1.1.45/media/f8fcf8b7226c2cf4365e.png"
                alt=""
                className=" w-[340px] md:w-[766px] "
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-8 text-center order-1 z-20">
            <h3 className="lg:text-2xl text-lg  font-bold !font-[Irancell1]">
              هر زمان و هر مکان ترید کن
            </h3>
            <p className="text-subtle text-sm lg:text-base font-medium text-wrap ">
              برنامه و وب‌سایت <span className="text-green-600">ماکوین</span> به
              شما این اجازه رو میدهد که به آسانی معامله کنید.
            </p>
            <div className="flex items-center   gap-12">
              <div className="flex flex-col self-start gap-12">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      theme === "dark"
                        ? "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-ios-dark.c9eba549.svg"
                        : "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-ios.9d6a3943.svg"
                    }
                    alt=""
                  />
                  <p className="lg:text-xl text-sm text-nowrap font-medium !font-[Irancell1]">
                    اپ استور
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      theme === "dark"
                        ? "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-gp-dark.3432d6b3.svg"
                        : "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-gp.9a4209bc.svg"
                    }
                    alt=""
                  />
                  <p className="lg:text-xl text-sm text-nowrap font-medium !font-[Irancell1]">
                    گوگل پلی
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      theme === "dark"
                        ? "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-apk-dark.61aed6d1.svg"
                        : "https://assets.staticimg.com/brisk-web/1.1.45/svg/download-apk.8d918f9e.svg"
                    }
                    alt=""
                  />
                  <p className="lg:text-xl text-sm text-nowrap font-medium !font-[Irancell1]">
                    دانلود مستقیم
                  </p>
                </div>
              </div>
              <div>
                <div className="lg:w-[50px] w-[25px] h-[82px] rounded-tl-[20px] border-l border-t dark:border-gray-600  border-gray-300"></div>
                <div className="lg:w-[100px] w-[50px] border-t dark:border-gray-600 border-gray-300"></div>
                <div className="lg:w-[50px] w-[25px] h-[82px] rounded-bl-[20px] border-l border-b dark:border-gray-600 border-gray-300"></div>
              </div>
              <div className="lg:w-[184px] lg:h-[184px] w-[100px] ">
                <img
                  src="/images/frame.png"
                  alt="qr-code"
                  className="object-cover rounded-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 lg:px-16 fade-in">
        <h3 className="lg:text-2xl text-lg  font-bold !font-[Irancell1]">
          ماکوین در کنار شما
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-6">
          <div className="bg-secondary p-10 rounded-3xl lg:min-h-[336px] flex flex-col">
            <div className="flex flex-col flex-1 justify-between h-full">
              <div>
                <h4 className="text-lg lg:text-xl font-semibold">
                  خدمات مشتری <span>{toPersianDigits("24")}</span> ساعته!
                </h4>
                <p className="text-sm lg:text-lg text-subtle font-medium mt-3">
                  سؤالی داری؟ همین حالا با پشتیبانی ماکوین در تماس باش — ۲۴
                  ساعته، بدون وقفه!
                </p>
              </div>

              <div
                tabIndex={0}
                role="button"
                className="text-green-600 text-sm lg:text-lg font-medium self-start mt-10 flex items-center gap-2 focus:scale-105 lg:hover:scale-105 cursor-pointer"
              >
                پشتیبانی ماکوین
                <WestIcon fontSize="small" />
              </div>
            </div>
          </div>
          <div className="bg-[#01BC8D14] p-10 rounded-3xl lg:min-h-[336px] flex flex-col">
            <div className="flex flex-col flex-1 justify-between h-full">
              <div>
                <h4 className="text-lg lg:text-xl font-semibold">
                  عضو خانواده ماکوین شو!
                </h4>
                <p className="text-sm lg:text-lg text-subtle font-medium mt-3">
                  به جمع بزرگ کاربران ایرانی و بین‌المللی ما ملحق شوید؛ با
                  پشتیبانی کامل به زبان فارسی و تجربه‌ای راحت در دنیای کریپتو.
                </p>
                <div className="flex flex-col gap-4 border-t border-gray-300 dark:border-gray-400/25 mt-2 lg:mt-8 py-4">
                  <p className="">راه های ارتباطی:</p>
                  <div className="flex items-center gap-4 *:cursor-pointer">
                    <img
                      src="https://assets.staticimg.com/cms/media/3F1Ut1EOpvsH7rYgY6BkpyVk8aAJTlTv3chIWPeQH.svg"
                      alt=""
                    />
                    <img
                      src="https://assets.staticimg.com/cms/media/1s5EuCsB6A8QvAg7LOk9YuB9khl2UwMPiAjfvuwMv.svg"
                      alt=""
                    />
                    <img
                      src="https://assets.staticimg.com/cms/media/6ua8uPVdbm1WrhhHPowHyp8icudajW1VGwZ3KLrGh.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div
                tabIndex={0}
                role="button"
                className="text-green-600 text-sm lg:text-lg font-medium self-start mt-10 flex items-center gap-2 focus:scale-105 lg:hover:scale-105 cursor-pointer"
              >
                مشاهده بیشتر
                <WestIcon fontSize="small" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AcoordingContext>
        <section className="container mx-auto lg:px-16 px-8 my-12 ">
          <div className="flex flex-col gap-6">
            <h4 className="text-lg lg:text-xl font-semibold">سوالات متداول</h4>
            <div className="flex flex-col items-start justify-center gap-8">
              <CustomAccordion title="بیت کوین چیست؟" className="bg-secondary">
                <p className="text-subtle text-[12px] lg:text-base">
                  بیت‌کوین اولین و شناخته‌شده‌ترین ارز دیجیتال دنیاست که بر
                  پایه‌ی شبکه‌ای همتا‌به‌همتا و بدون وابستگی به هیچ مرجع مرکزی
                  فعالیت می‌کند. با بیت‌کوین می‌توانید ارزش را سریع، مستقیم و
                  بدون واسطه در سراسر جهان جابه‌جا کنید. در ماکوین، خرید و فروش
                  بیت‌کوین ساده، امن و همیشه در دسترس شماست.
                </p>
              </CustomAccordion>
              <CustomAccordion
                title="‏آیا ماکوین یک صرافی ارز دیجیتال امن است؟‏"
                className="bg-secondary"
              >
                <p className="text-subtle text-[12px] lg:text-base">
                  ماکوین متعهد است یک پلتفرم خرید و فروش ارز دیجیتال ایمن و قابل
                  اعتماد فراهم کند؛ با بهره‌گیری از فناوری‌های امنیتی پیشرفته و
                  تیم پشتیبانی حرفه‌ای. تیم امنیت اختصاصی ما همراه با تأیید
                  مستقل ذخایر (Proof of Reserves)، تضمین می‌کند که همه
                  دارایی‌های کاربران به‌صورت ۱:۱ پشتیبانی می‌شوند. با ماکوین،
                  خیال‌تان از امنیت حساب و سرمایه‌تان همیشه راحت است.
                </p>
              </CustomAccordion>{" "}
              <CustomAccordion
                title=" می توانم فقط با 1 دلار معامله را شروع کنم؟ "
                className="bg-secondary"
              >
                <p className="text-subtle text-[12px] lg:text-base">
                  ماکوین امکانات متنوعی برای خرید و فروش ارزهای دیجیتال ارائه
                  می‌دهد؛ شما می‌توانید حتی با سرمایه‌ای کوچک شروع کنید. از
                  تبدیل بدون کارمزد گرفته تا معاملات اسپات، مارجین و فیوچرز،
                  همه‌چیز آماده است تا با خیال راحت استراتژی‌های مختلف را امتحان
                  کنید و مهارت‌تان را در دنیای کریپتو ارتقا دهید — بدون نگرانی
                  از هزینه‌های ورود!
                </p>
              </CustomAccordion>{" "}
              <CustomAccordion
                title=" محدودیت مبادله ای بین فیات و کریپتو وجود دارد؟"
                className="bg-secondary"
              >
                <p className="text-subtle text-[12px] lg:text-base">
                  در ماکوین می‌توانید بدون دغدغه و با مبالغ دلخواه، خرید و فروش
                  ارز دیجیتال را شروع کنید. حداقل مبلغ تبدیل از فیات به کریپتو
                  بسیار پایین است و با تایید هویت، سقف تراکنش‌هایتان هم افزایش
                  پیدا می‌کند. ماکوین با رعایت قوانین جهانی و امنیت کامل، خیال
                  شما را از هر محدودیتی راحت می‌کند — شروع کنید و در دنیای
                  کریپتو بی‌مرز معامله کنید!
                </p>
              </CustomAccordion>{" "}
            </div>
          </div>
        </section>
      </AcoordingContext>
      <section className="bg-[url(https://assets.staticimg.com/brisk-web/1.1.45/svg/quickstart-bg-dark.ac1aaba7.svg)] w-full min-h-[230px] bg-cover flex items-center justify-center">
        <div className="container mx-auto px-12">
          <div className="flex flex-col flex-1 h-full items-center justify-center gap-6 py-8 ">
            <div className="text-center text-2xl font-bold">
              همین الان وارد دنیای کریپتو شو!
            </div>
            <Botton link="/register/signup" title="همین الان ثبت نام کن!" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainHome;

const ProductCard = ({
  title,
  dec,
  logo,
  darkLogo,
}: {
  title: string;
  dec: string;
  logo: string;
  darkLogo?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className=" bg-secondary px-8 py-10 rounded-2xl  transition-all duration-500 hover:-translate-y-4">
      <div className="flex flex-col justify-center gap-3  items-center">
        <div className="flex w-full items-center justify-center gap-4 lg:justify-between">
          <h5 className="text-xl  font-bold text-green-800">{title} </h5>
          <span className="hidden lg:block">
            <WestIcon />
          </span>
        </div>
        <div className="flex items-center  gap-8">
          <div className="text-subtle font-normal text-sm lg:text-lg text-center order-2 flex-2/3">
            {dec}
          </div>
          <img
            src={darkLogo ? (isDark ? darkLogo : logo) : logo}
            alt={title}
            className=" lg:w-[150px] w-[90px]  object-cover"
            draggable={false}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const SecurCard = ({
  title,
  dec,
  img,
  darkLogo,
}: {
  title: string;
  dec: string;
  img: string;
  darkLogo?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex lg:flex-col gap-2 items-center ">
      <img
        src={darkLogo ? (isDark ? darkLogo : img) : img}
        alt={title}
        className="w-15 lg:w-30"
        draggable={false}
        loading="lazy"
      />
      <div className="flex flex-col gap-2">
        <p className="lg:text-xl tex-lg font-medium text-nowrap text-center">
          {title}
        </p>
        <div className="text-subtle text-sm lg:text-base text-center ">
          {dec}
        </div>
      </div>
    </div>
  );
};

const ShowCoinCard = ({
  title,
  hook,
  className = "flex",
}: {
  title: string;
  hook: OldMarket[];
  className?: string;
}) => {
  // const { pathname } = useLocation();
  // console.log(pathname);

  return (
    <div
      className={`bg-secondary  flex-col gap-4 items-start justify-center rounded-xl   py-6  ${className} `}
    >
      <div className="inline-block border-r-4 border-green-600  text-xl font-medium mx-10 px-3">
        {title}
      </div>
      <div className="flex flex-col items-start justify-center  w-full  ">
        {hook.map((coin) => {
          return (
            <Link
              key={coin?.symbol}
              to={`/coin/${coin?.symbol}?baseAsset=${coin?.baseAsset}&name=${coin?.enName}`}
              className="flex items-center justify-between  w-full px-10 py-4 dark:hover:bg-gray-800/60 "
            >
              <div className="flex items-center gap-3">
                <img
                  src={coin.baseAsset_svg_icon}
                  alt={coin.baseAsset}
                  width={"36px"}
                  height={"36px"}
                  className=""
                  draggable="false"
                  loading="lazy"
                />

                <div className="flex items-start flex-col justify-center">
                  <h4 className="font-medium">{coin?.baseAsset}</h4>
                  <p className="text-subtle">{coin?.faBaseAsset}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <h5 className="font-medium text-sm lg:text-base text-nowrap">
                  {parseFloat(coin?.stats.lastPrice).toLocaleString("fa-IR", {
                    maximumFractionDigits: 2,
                  })}
                  تومان
                </h5>
                <p
                  className={`${
                    coin.stats["24h_ch"] >= 0
                      ? "text-green-600 "
                      : "text-red-600 "
                  } `}
                  dir="ltr"
                >
                  {coin?.stats["24h_ch"]}%
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
