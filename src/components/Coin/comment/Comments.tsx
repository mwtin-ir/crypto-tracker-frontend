import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState, type FormEvent } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentItem from "./CommentItem";
import DialogBar from "../../modal/Dialog";
import { useUser } from "../../../utils/Context/UserProvider";
import { useTheme } from "../../../utils/Context/ThemeProvider";
import { WestOutlined } from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';
import {
  addComment,
  getComments,
  type Comment,
} from "../../../services/coin/comments";
import toast from "react-hot-toast";
function Comments({
  coinName = "تتر",
  symbol,
}: {
  coinName: string;
  symbol: string;
}) {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [coinComments, setCoinComments] = useState<Comment[]>([]);
  const [formEror, setFormError] = useState<string>("");
  const { theme } = useTheme();
  const fetchData = async () => {
    const data = await getComments(symbol);
    setCoinComments(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useMemo(()=>{
    
  },[coinComments])

  const isDark = theme === "dark";
  const userUnSetAvator = !isDark
    ? "/images/user/profile-user.png"
    : "/images/user/user-dark.png";
  const addCommentHandler = () => {
    if (!user) setOpenDialog(true);
    document
      .getElementById("new-comment")
      ?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("comment-area")?.focus();
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      setOpenDialog(true);
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    } else {
      if (!comment.trim()) {
        setFormError("لطفا کامنت  خود را بنویسید");
        return;
      }

      setFormError("");
      console.log(user?.id);
      if (user) {
        await addComment(symbol, user?.id, user?.username, comment);
        setComment("");
        fetchData();
      }
    }
  };

  return (
    <div className="bg-secondary  rounded-2xl shadow-xl lg:col-span-2 order-2 lg:order-1 min-h-[398px]">
      <div className="flex flex-col ">
        <div className="p-6  ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-600 rounded-full text-center">
                <img
                  src="https://www.zhaket.com/_next/static/media/messageStar.c22e2572.svg"
                  alt="comment-icon"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-lg font-medium">دیدگاه‌ها</p>
            </div>
            <Button
              onClick={addCommentHandler}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "1rem",
                bgcolor: "#357a38",
                textAlign: "center",
                padding: ".5rem",
                color: "white",
                borderRadius: "12px",
              }}
            >
              <AddCircleOutlineIcon className="" fontSize="small" />
              افزودن دیدگاه
            </Button>
          </div>
        </div>

        <div className="flex flex-col  items-start">
          {coinComments.map((c: Comment) => (
            <CommentItem
              key={c._id}
              comment={c}
              userID={user?.id as string}
              fetchData={fetchData}
            />
          ))}
        </div>
        <div
          className=" p-6 border-t border-gray-200 dark:border-gray-800 w-full "
          id="new-comment"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center justify-start gap-4">
              <img
                src={user?.avatar ?? userUnSetAvator}
                alt="user-avatar"
                className="object-cover w-9 h-9 "
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-medium ">{user?.username}</h3>
                <h4 className="text-subtle text-sm">افزودن نظر جدید</h4>
              </div>
            </div>
            <form
              action=""
              onSubmit={handleCommentSubmit}
              className="w-full flex flex-col gap-4 items-end"
            >
              <textarea
                name="comment"
                id="comment-area"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full  min-h-30 border border-gray-200 rounded-2xl p-4 focus:outline-cyan-700"
                placeholder={`لطفا نظر خود را درباره ${coinName} بنویسید`}
              ></textarea>
              {formEror && (
                <p className="text-red-600 underline self-start text-sm">
                  {formEror}
                </p>
              )}
              <Button
                color="success"
                variant="contained"
                sx={{
                  borderRadius: "1rem",
                  display: "flex",
                  gap: "8px",
                  fontSize: "1rem",
                }}
                type="submit"
              >
                ثبت نظر
                <WestOutlined fontSize="small" />
              </Button>
            </form>
          </div>
        </div>
      </div>
      <DialogBar open={openDialog} onClose={handleClose} />
    </div>
  );
}

export default Comments;
