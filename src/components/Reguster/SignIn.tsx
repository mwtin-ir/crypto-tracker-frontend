import React, { useState, type FormEvent } from "react";
import FormLayout from "./formLayout";
import { Link } from "react-router-dom";
import { useTheme } from "../../utils/Context/ThemeProvider";
import * as z from "zod";

import { useUser } from "../../utils/Context/UserProvider";
const loginScema = z.object({
  email: z.string().email().nonempty({ message: "وارد کردن ایمیل الزامی ست" }),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .nonempty({ message: "وارد کردن رمز عبور الزامی است" }),
});
function SignIn() {
  const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const setLoginValid = loginScema.safeParse({ email, password });
    try {
      await login(
        setLoginValid.data?.email as string,
        setLoginValid.data?.password as string
      );
    } catch {
      console.log("در لاگین مشکلی پیش اومده است");
    }
  }
  return (
    <FormLayout>
      <h1 className="!font-[Irancell1] text-2xl font-bold ">ورود</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div className="relative border border-gray-600 p-3 rounded-md z-10">
          <input
            type="text"
            placeholder="ایمیل / شماره تلفن"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="emailOrPhone"
            id="emailOrPhone"
            className="outline-none border-none bg-[unset] z-10"
          />
          <label
            htmlFor="emailOrPhone"
            className="absolute -top-4 right-2  bg-secondary p-1 rounded-sm text-[13px]"
          >
            ایمیل / شماره تلفن
          </label>
        </div>
        <div className="relative border border-gray-600 p-3 rounded-md z-10">
          <input
            type="text"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="emailOrPhone"
            id="emailOrPhone"
            className="outline-none border-none bg-[unset] z-10"
          />
          <label
            htmlFor="emailOrPhone"
            className="absolute -top-4 right-2  bg-secondary p-1 rounded-sm text-[13px]"
          >
            رمز عبور{" "}
          </label>
        </div>
        <button
          className={` dark:bg-[#01bc8d] bg-zinc-400  text-white w-full  py-3 rounded-xl shadow-lg text-xl font-medium`}
        >
          ورود
        </button>
      </form>
      <div className="grid grid-cols-3 items-center gap-3">
        <div className=" h-[1px] bg-gray-200 dark:bg-gray-700"></div>
        <p className="text-sm lg:text-base font-light text-center">
          همچنین ادامه بدید{" "}
        </p>
        <div className=" h-[1px] bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl shadow-sm border border-gray-300">
          <div className="flex items-center justify-center gap-2 py-3">
            <span className="text-base font-medium text-center">Apple</span>
            <img
              src={
                isDark
                  ? "https://assets.staticimg.com/g-biz/externals/2022-06-01/809a523014f5ccf5.svg"
                  : "https://assets.staticimg.com/g-biz/externals/2022-06-01/e386f36bcb9df7af.svg"
              }
              alt="Apple-icon"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

        <Link
          to={"http://localhost:3120/api/auth/google"}
          className="bg-secondary p-2 rounded-2xl border shadow-sm border-gray-300 hover:scale-105"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium text-lg pt-1">Google</span>
            <img
              src="https://assets.staticimg.com/g-biz/externals/2022-06-01/dedfe0e901fb83a6.svg"
              width={24}
              height={24}
              alt="google-icon"
              loading="lazy"
              draggable={false}
            />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2 ">
        <p className="text-subtle">آیا حساب کاربری ندارید؟</p>
        <Link
          to="/register/signup"
          className="font-medium underline hover:text-green-500"
        >
          ثبت‌نام
        </Link>
      </div>
    </FormLayout>
  );
}

export default SignIn;
