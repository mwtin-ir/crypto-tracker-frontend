import { CloseOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

interface modalProps {
  open: boolean;
  onClose: () => void;
  text: string;
  functionality: () => void;
}

function DeleteModal({ open, onClose, text, functionality }: modalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-96 shadow-lg flex flex-col gap-4"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="tewxt-sm text-subtle">حذف کردن نظر</p>
            <CloseOutlined onClick={onClose} />
          </div>
          <p className="text-xl font-bold">{text}</p>
          <div className="flex items-center justify-between flex-2 gap-6 ">
            <Button
              variant="outlined"
              className="flex-1 "
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
              onClick={onClose}
            >
              لغو
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="flex-1 "
              sx={{
                fontSize: "1.2rem",
                fontWeight: "600",
              }}
              onClick={functionality}
            >
              تایید
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
