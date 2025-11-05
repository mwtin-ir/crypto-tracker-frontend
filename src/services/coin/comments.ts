import axios from "axios";
import toast from "react-hot-toast";

export interface Comment {
  _id: string;
  userId: string;
  username: string;
  text: string;
  likes: number;
  dislikes: number;
  rating: number;
  createdAt: string;
}

// ================= GET کامنت‌ها =================
export const getComments = async (
  symbol: string,
  page = 1,
  limit = 2,
  sort: "newest" | "oldest" = "newest"
): Promise<Comment[]> => {
  try {
    const res = await axios.get("http://localhost:3120/api/comments", {
      params: { symbol, page, limit, sort },
    });

    if (res.data?.data) {
      // میتونی فقط برای موفقیت toast نذاری، معمولا fetch موفق نیاز نیست
      // toast.success("کامنت‌ها با موفقیت دریافت شدند!", { duration: 3000 });
      return res.data.data;
    }

    return [];
  } catch (err: any) {
    const message =
      (err.data.error as string) ||
      (err.data.message as string) ||
      "خطا در گرفتن کامنت‌ها";

    toast.error(message, {
      duration: 5000,
      style: { background: "red", color: "white" },
    });

    console.error("Get comments error:", err);

    throw new Error(message); // فقط یک پیام می‌دهیم
  }
};

// ================= POST کامنت جدید =================
export const addComment = async (
  symbol: string,
  userId: string,
  username: string,
  text: string
): Promise<Comment | null> => {
  try {
    const res = await axios.post("http://localhost:3120/api/comments", {
      symbol,
      userId,
      username,
      text,
    });

    toast.success("نظر  با موفقیت اضافه شد!", {
      duration: 5000, // ۵ ثانیه
      style: { background: "green", color: "white" },
    });

    return res.data;
  } catch (err: any) {
    // اگر جواب از سرور بود
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "خطای ناشناخته";
    console.log(err);
    toast.error(message, {
      duration: 2000, // 2 ثانیه
      style: { background: "red", color: "white" },
    });

    console.error("Add comment error:", err);
    return null;
  }
};
// ================= لایک کامنت =================
export const likeComment = async (
  commentId: string,
  userId: string
): Promise<{ likes: number; dislikes: number; rating: number } | null> => {
  try {
    const res = await axios.post(
      `http://localhost:3120/api/comments/${commentId}/like`,
      { userId }
    );
    return res.data;
  } catch (error: any) {
    console.error("Error liking comment:", error);
    toast.error(error?.response?.data?.message || "خطا در لایک کامنت!");
    return null;
  }
};

// ================= دیسلایک کامنت =================
export const dislikeComment = async (
  commentId: string,
  userId: string
): Promise<{ likes: number; dislikes: number; rating: number } | null> => {
  try {
    const res = await axios.post(
      `http://localhost:3120/api/comments/${commentId}/dislike`,
      { userId }
    );
    return res.data;
  } catch (error: any) {
    console.error("Error disliking comment:", error);
    toast.error(error?.response?.data?.message || "خطا در دیسلایک کامنت!");
    return null;
  }
};

// ================= حذف کامنت =================
export const deleteComment = async (
  commentId: string
): Promise<{ ok: boolean }> => {
  const res = await axios.delete(
    `http://localhost:3120/api/comments/${commentId}`
  );
  return res.data;
};
