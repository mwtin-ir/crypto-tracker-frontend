import React, {type FC } from "react";
import Navbar from "../NavBar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const MainLayout: FC = () => {
  return (
    <>
      <Navbar />
      <div className="pt-15 flex-1 bg-gray-200/50 dark:bg-[#1D2430]/12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
