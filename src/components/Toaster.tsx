import React from "react";
import { Toaster } from "react-hot-toast";
const ToasterPopUp = () => {
  return (
    <Toaster
      position="top-left"
      
      toastOptions={{
         duration: 5000,
        // تنظیمات عمومی همه toastها
        style: {
          fontFamily: "IranSansX",
          borderRadius: "12px",
          padding: "12px 18px",
          color: "#fff",
        },
        // تنظیمات مخصوص success
        success: {
          style: {
            background: "linear-gradient(135deg, #00b09b, #96c93d)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#00b09b",
          },
        },
        // تنظیمات مخصوص error
        error: {
          style: {
            background: "linear-gradient(135deg, #ff4b2b, #ff416c)",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#ff4b2b",
          },
        },
      }}
    />
  );
};

export default ToasterPopUp;
