import { IconButton, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import {
  likeComment,
  dislikeComment,
  type Comment,
  deleteComment,
} from "../../../services/coin/comments";
import toast from "react-hot-toast";
import LoginModal from "../../modal/Dialog";
import { Delete } from "@mui/icons-material";
import DeleteModal from "../../modal/DeleteModal";
import axios from "axios";

function CommentItem({
  comment,
  userID,
  fetchData,
}: {
  comment: Comment;
  userID: string;
  fetchData: () => Promise<void>;
}) {
  // ===== State محور کردن کامپوننت =====
  const [likes, setLikes] = useState(comment.likes ?? 0);
  const [dislikes, setDislikes] = useState(comment.dislikes ?? 0);
  const [rating, setRating] = useState(comment.rating ?? 0)
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false);
  const formatDate = moment(comment.createdAt).format("jYYYY/jM/jD");
  const [canDelete, setCanDelete] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  useEffect(() => {
    console.log(comment)
    if (comment.userId === userID) {
      setCanDelete(true);
    }
  }, [comment]);

  // ===== هندل لایک =====
  const handleLike = async () => {
    try {
      if (!userID) {
        setOpenLoginDialog(true);

        return;
      }
      const data = await likeComment(comment._id, userID);
      if (data) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setRating(data.rating);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.error || "مشکلی در ارتباط با سرور پیش اومد "
        );
      } else {
        toast.error("مشکلی در لایک پیش اومد ");
      }
    }
  };

  // ===== هندل دیسلایک =====
  const handleDislike = async () => {
    try {
      if (!userID) {
        setOpenLoginDialog(true);
        return;
      }
      const data = await dislikeComment(comment._id, userID);
      if (data) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setRating(data.rating);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.error || "مشکلی در ارتباط با سرور پیش اومد "
        );
      } else {
        toast.error("مشکلی در دیسلایک پیش اومد ");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComment(comment._id);
      toast.success("نظر با موفقیت حذف شد ");
      fetchData();
      setTimeout(() => {
        setOpenDeleteModal(false);
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      toast.error("مشکلی در حذف نظر پیش اومد ");
    }
  };

  return (
    <>
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2 ">
            <div className="flex items-center gap-2">
              <img
                src="https://ircdn.zhaket.com/resources/5dca2863eaec3700092088cd/67a8efd111608d898c09d945.png"
                alt="user-icon"
                height={41}
                width={32}
                loading="lazy"
                decoding="async"
                className="rounded-full"
              />
              <p className="text-base font-semibold">{comment.username}</p>
              <span className="text-subtle text-sm">{formatDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-subtle text-nowrap">
                {rating} از 5 رای
              </span>
              <Rating sx={{ direction: "ltr" }} readOnly value={rating}  defaultValue={0} />
            </div>
          </div>

          <div>
            <p className="text-subtle">{comment.text}</p>
          </div>

          <div className="flex items-center justify-between ">
            <div className="border py-1 border-gray-200 rounded-lg w-38">
              <div className="flex items-center gap-1 justify-center">
                <IconButton onClick={handleLike} size="small">
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
                <p className="font-medium">{likes}</p>

                <IconButton onClick={handleDislike}>
                  <ThumbDownAltIcon fontSize="small" />
                </IconButton>
                <p className="font-medium">{dislikes}</p>
              </div>
            </div>
            {canDelete && (
              <IconButton onClick={() => setOpenDeleteModal(true)}>
                <Delete className="text-red-600 " />{" "}
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        text={"آیا از حذف نظر خود مطمئن هستید؟"}
        functionality={handleDelete}
      />
    </>
  );
}

export default CommentItem;
