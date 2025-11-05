import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import DarkMode from "../components/DarkMode";
import { useUser } from "../utils/Context/UserProvider";
function Register() {
  const [email,setEmail]=useState<string>("")
  const {user}=useUser()
  const navigate = useNavigate()
  useEffect(()=>{
  window.document.title = "ورود | ماکوین"
  if(user) navigate("/dashboard")
    console.log(user)
  },[user])
  return (
    <div className="relative flex flex-col min-h-screen ">
      {/* <header className="h-[70px]">
        <nav className="fixed top-0   w-full px-4 py-3 bg-secondary shadow-lg z-[100] h-[70px]">
          <ul className="flex items-center justify-between">
            <li>
              <Logo />
            </li>
            <li className="flex items-center gap-6">
              <Qrcode />
              <DarkMode />
            </li>
          </ul>
        </nav>
      </header> */}
   <div className="absolute top-4 left-5 z-10 flex items-center gap-4 ">
        <DarkMode/>

        <Button href="/" variant="outlined" color="error" sx={{borderRadius:"0.8rem"}}>
          خروج
        </Button>
     </div>
      <main className="relative flex-1 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 ">
        <div className="flex items-center ">
          <h1 className="text-4xl font-extrabold !font-[Irancell1]">
            <span className="text-6xl text-green-900">MA</span>coin
          </h1>
          <img
            src="/images/icon/nonBG-icon.svg"
            width={105}
            height={105}
            alt="macoin logo"
          />
        </div>
        <div className="flex items-center justify-center relative">
          <Outlet context={{email,setEmail}}/>
        </div>
        <div className="hidden absolute lg:flex left-0 top-0 w-[250px] h-[250px] bg-sky-500 opacity-20  rounded-full blur-[120px] z-0"></div>
        <div className="hidden absolute lg:flex right-0 bottom-0 w-[250px] h-[250px] bg-amber-500 opacity-20  rounded-full blur-[120px] z-0"></div>
      </main>
    </div>
  );
}

export default Register;
