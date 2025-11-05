import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/Context/UserProvider";
import React from "react";

export default function Dashboard() {
  const { user, loading, logout } = useUser();
const navigate = useNavigate()
  if (loading) return <p>در حال بارگذاری...</p>;

  if (!user) navigate("/register/signin")

  return (
    <div>
      <h1>سلام {user?.username}</h1>
      <button onClick={logout}>خروج</button>
    </div>
  );
}
