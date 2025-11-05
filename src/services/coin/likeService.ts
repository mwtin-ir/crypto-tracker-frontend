import axios from "axios";
import { useId } from "react";
import toast from "react-hot-toast";

// Toggle like coin
export const toggleLikeCoin = async (coin: string, userId: string) => {
  try {
    const res = await axios.post(
      "http://localhost:3120/api/users/coin/like",
      {
        coin,
        userId,
      },
      {
        withCredentials: true,
      }
    );
    toast.success(res.data.message);
    return res.data.likedCoins;
  } catch (err: any) {
    toast.error(err.response?.data?.error || "خطا در لایک کردن کوین");
    return null;
  }
};

// Toggle bookmark coin
export const toggleBookmarkCoin = async (coin: string, userId: string) => {
  console.log(useId);
  try {
    const res = await axios.post(
      "http://localhost:3120/api/users/coin/bookmark",
      {
        coin,
        userId,
      },
      {
        withCredentials: true,
      }
    );
    toast.success(res.data.message);
    return res.data.bookmark;
  } catch (err: any) {
    console.log(err);
    toast.error(err.response?.data?.error || "خطا در بوکمارک کردن کوین");
    return null;
  }
};
