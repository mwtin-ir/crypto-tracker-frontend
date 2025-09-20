import React from "react";
import Navbar from "../NavBar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-18 md:pt-[60px] bg-gray-200/50 dark:bg-gray-800/20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
