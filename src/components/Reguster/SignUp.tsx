import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useTheme } from "../../utils/Context/ThemeProvider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Link, useNavigate } from "react-router-dom";
import FormLayout from "./formLayout";
import * as z from "zod";
import checkEmailExists from "../../utils/auth/exitEmail";
import { Button } from "@mui/material";
import KeyOffOutlinedIcon from "@mui/icons-material/KeyOffOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import createUser from "../../services/createUser";


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailSchema = z
  .string()
  .email()
  .min(8)
  .regex(emailRegex, "ایمیل معتبر نیست");

interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  emailError: string;
  usernameError: string;
  passwordError: string;
  passShow: boolean;
  conPassShow: boolean;
}

type FormAction =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_USERNAME"; payload: string }
  | { type: "SET_EMAIL_ERROR"; payload: string }
  | { type: "SET_PASSWORD_ERROR"; payload: string }
  | { type: "SET_USERNAME_ERROR"; payload: string }
  | { type: "SET_PASSSHOW"; payload: boolean }
  | { type: "SET_CONF_PASSSHOW"; payload: boolean }
  | { type: "RESET" };

const init: FormState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  emailError: "",
  passwordError: "",
  usernameError: "",
  passShow: false,
  conPassShow: false,
};
const reduerAction = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_EMAIL_ERROR":
      return { ...state, emailError: action.payload };
    case "SET_PASSWORD_ERROR":
      return { ...state, passwordError: action.payload };
    case "SET_USERNAME_ERROR":
      return { ...state, usernameError: action.payload };
    case "SET_CONF_PASSSHOW":
      return { ...state, conPassShow: !action.payload };
    case "SET_PASSSHOW":
      return { ...state, passShow: !action.payload };

    case "RESET":
      return init;
    default:
      return state;
  }
};

const signupSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "نام کاربری الزامی است" })
      .min(6, "نام کاربری حداقل 6 کاراکتر باید باشد است"),
    password: z
      .string()
      .nonempty({ message: "رمز عبور الزامی است" })
      .min(8, "رمز عبور حداقل 8 کاراکتر باید باشد "),
    confirmPassword: z
      .string()
      .nonempty({ message: "تکرار رمز عبور الزامی است" })
      .min(8, "تکرار رمز عبور حداقل 8 کاراکتر باید باشد "),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"], // روی فیلد خاص ارور میده
  });
function SignUp() {
  const [
    {
      email,
      username,
      password,
      confirmPassword,
      emailError,
      passwordError,
      usernameError,
      conPassShow,
      passShow,
    },
    dispatch,
  ] = useReducer(reduerAction, init);

  const [currentSignup, setCurrenSignup] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  // --- HANDLE FORM SUBMIT ---
  const formAction = async (e: FormEvent) => {
    e.preventDefault();



    if (!email) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "لطفا ایمیل وارد کنید" });
      return;
    }

    const validEmail = emailSchema.safeParse(email);

    if (!validEmail.success) {
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: validEmail.error.issues[0].message,
      });
      return;
    }

    try {
      const existing = await checkEmailExists(email);

      if (!existing) {
        setCurrenSignup(1); // ادامه ثبت نام
      } else {
        dispatch({
          type: "SET_EMAIL_ERROR",
          payload: "ایمیل موجود است، لطفا وارد شوید",
        });
      }
    } catch (err) {
      console.error("خطا در بررسی ایمیل:", err);
      dispatch({
        type: "SET_EMAIL_ERROR",
        payload: "خطا در بررسی ایمیل، دوباره تلاش کنید",
      });
    }
  };

  // --- HANDLE EMAIL INPUT ---
  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    dispatch({ type: "SET_EMAIL", payload: value });

    // چک اولیه بدون alert
    if (value.length > 10 && !value.includes("@")) {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "ایمیل معتبر نیست" });
    } else {
      dispatch({ type: "SET_EMAIL_ERROR", payload: "" });
    }
  };

  const signupSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log("clicked");
    const result = signupSchema.safeParse({
      username,
      password,
      confirmPassword,
    });
    console.log(result);
    if (!result.success) {
      const errors = result.error.format();
      dispatch({
        type: "SET_USERNAME_ERROR",
        payload: errors.username?._errors[0] || "",
      });
      if (password !== confirmPassword) {
        dispatch({
          type: "SET_PASSWORD_ERROR",
          payload: errors.confirmPassword?._errors[0] || "",
        });
      }
      return;
    }
    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await createUser(userData);
      console.log("ثبت نام با موفقیت", response);
      navigate("/dashboard");
    } catch (error) {
      console.error("خطا در ثبت نام:", error);
    }
  };

  const confirmPassHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: "SET_CONFIRM_PASSWORD", payload: value });
  };
  return (
    <FormLayout>
      <h1 className="text-2xl font-bold">
ورود / ثبت نام
      </h1>

      {currentSignup === 0 ? (
        <>
          <form onSubmit={formAction} className="flex flex-col gap-5">
            <div className="relative  p-3 rounded-2xl border border-gray-100 bg-gray-100 dark:bg-gray-700/60 shadow ">
              <input
                ref={inputRef}
                type="text"
                placeholder="ایمیل"
                value={email}
                onChange={emailInputHandler}
                name="email"
                id="emailOrPhone"
                className="outline-none border-none bg-[unset] w-full"
              />
              <MailOutlineIcon className="absolute top-3 left-2 text-gray-600" />
            </div>

            {emailError && (
              <p className="text-red-600 text-[12px]">{emailError}</p>
            )}

            <button
              type="submit"
              className={`w-full py-2 rounded-xl shadow-lg text-lg font-medium text-white h-[45px]  ${
                email
                  ? "dark:bg-green-600 hover:opacity-85 bg-zinc-800"
                  : "dark:bg-green-600/30 bg-zinc-400 cursor-not-allowed"
              }`}
            >
              ادامه
            </button>
          </form>
          <div className="grid grid-cols-3 items-center gap-3 my-4">
            <div className="h-[1px] bg-gray-200 dark:bg-gray-700"></div>
            <p className="text-sm lg:text-base font-light text-center">
              همچنین 
            </p>
            <div className="h-[1px] bg-gray-200 dark:bg-gray-700"></div>
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

        </>
      ) : (
        <>
          <form onSubmit={signupSubmitHandler} className="flex flex-col gap-4">
            <div className="relative border border-gray-600 p-3 rounded-2xl">
              <input
                type="text"
                placeholder="نام کاربری خود را وارد کنید"
                value={username}
                onChange={(e) =>
                  dispatch({ type: "SET_USERNAME", payload: e.target.value })
                }
                name="username"
                id="username"
                className="outline-none border-none bg-[unset] w-full placeholder:text-sm placeholder:font-light"
              />
              <label
                htmlFor="username"
                className="absolute -top-4 right-2 bg-secondary p-1 rounded-sm text-[13px]"
              >
                نام کاربری
              </label>
            </div>

            <div className="relative border border-gray-600 p-3 rounded-2xl">
              <input
                type={passShow ? "text" : "password"}
                placeholder="رمز عبور خود را وارد کنید"
                value={password}
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                }
                name="username"
                id="password"
                className="outline-none border-none bg-[unset] w-full placeholder:text-sm placeholder:font-light"
              />
              <label
                htmlFor="password"
                className="absolute -top-4 right-2 bg-secondary p-1 rounded-sm text-[13px]"
              >
                رمز عبور
              </label>
              <span
                className="absolute top-0 left-0  p-2 cursor-pointer"
                onClick={() =>
                  dispatch({ type: "SET_PASSSHOW", payload: passShow })
                }
              >
                {!passShow ? <KeyOffOutlinedIcon /> : <KeyOutlinedIcon />}
              </span>
            </div>
            <div className="relative border border-gray-600 p-3 rounded-2xl">
              <input
                type={conPassShow ? "text" : "password"}
                placeholder=" رمز عبور خود را تایید کنید"
                value={confirmPassword}
                onChange={confirmPassHandler}
                name="username"
                id="confirmPassword"
                className="outline-none border-none bg-[unset] w-full placeholder:text-sm placeholder:font-light"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute -top-4 right-2 bg-secondary p-1 rounded-sm text-[13px]"
              >
                تایید رمز عبور
              </label>
              <span
                className="absolute top-0 left-0  p-2 cursor-pointer"
                onClick={() =>
                  dispatch({ type: "SET_CONF_PASSSHOW", payload: conPassShow })
                }
              >
                {!conPassShow ? <KeyOffOutlinedIcon /> : <KeyOutlinedIcon />}
              </span>
            </div>
            {usernameError && (
              <p className="text-red-600 text-[12px] ">{usernameError}</p>
            )}
            {passwordError && (
              <p className="text-red-600 text-[12px] ">{passwordError}</p>
            )}

            <Button
              type="submit"
              variant="contained"
              className="p-2 text-lg font-semibold"
              sx={{
                padding: "0.6rem",
                borderRadius: "1rem",
                bgcolor: "black",
                fontSize: "1.2rem",
                color: "white",
              }}
            >
              ثبت نام
            </Button>
          </form>
        </>
      )}
    </FormLayout>
  );
}

export default SignUp;
