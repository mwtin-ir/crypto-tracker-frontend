import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // پاک کردن توکن از URL
      window.history.replaceState({}, document.title, "/");
      navigate("/dashboard"); // ریدایرکت بعد از لاگین
    } 
  }, [navigate]);
return <p>loading.....</p>
}
