import React, { useState, type FormEvent } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useUser } from "../../utils/Context/UserProvider";
export default function LoginModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  if (!open) return null;
  const hedleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resp = await login(email, password);
    console.log(resp);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-96 shadow-lg flex flex-col gap-4"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center  font-[IranSansX]">
          ورود به حساب کاربری
        </h2>
        <p className="text-subtle text-sm">
          حساب کاربری ندارید؟؟{" "}
          <Link
            to={"/register/signup"}
            className="underline text-green-800 hover:scale-105"
          >
            ثبت نام کنید
          </Link>
        </p>

        <form onSubmit={hedleSubmit} className="flex flex-col gap-4 ">
          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-right font-[IranSansX] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-right font-[IranSansX] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>

          <p className="text-sm underline">رمز عبور خود را فراموش کرده اید؟</p>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="w-1/2 bg-gray-300 text-black py-2 rounded-lg mx-1 font-[IranSansX] hover:bg-gray-400 transition"
            >
              لغو
            </button>
            <button className="w-1/2 bg-green-800 text-white py-2 rounded-lg mx-1 font-[IranSansX] hover:bg-blue-700 transition">
              ورود
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
