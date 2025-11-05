import { Link } from "react-router-dom";
import React from "react";
export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link
        to="/"
        className=" py-1 px-2 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 font-bold text-3xl xl:text-4xl"
      >
        <span className="hidden md:inline-block !font-[Irancell1]">ماکوین</span>
        <img src="/public/images/mainIcon.svg" alt="logo" width={42} height={42} className="md:hidden"/>
      </Link>
    </div>
  );
}
