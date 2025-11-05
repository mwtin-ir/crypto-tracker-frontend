import { QrCode } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import Botton from "../Botton";

function Qrcode() {
  const [open, setOpen] = useState(false);
  const mouseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function mouseEnter() {
    if (mouseRef.current) clearTimeout(mouseRef.current);
    setOpen(true);
  }

  function mouseLeave() {
    mouseRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  }

  return (
    <div className="relative hidden lg:block">
      <QrCode
        className="cursor-pointer text-gray-700 dark:text-gray-200"
        fontSize="medium"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      />

      {open && (
        <div className="absolute top-[200%]  left-0 bg-secondary rounded-xl p-6 flex flex-col items-center gap-4 w-[250px]  " onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <div className="w-[180px] h-[180px]">
            <img
              src="/images/frame.png"
              alt="qr-code"
              className="object-cover rounded-[16px]"
            />
          </div>
          <span className="text-lg text-center text-subtle">
            برای دانلود اپلیکیشن بارکد بالا را اسکن کنید.
          </span>
          <Botton link="/" title="دانلود اپلیکیشن" />
        </div>
      )}
    </div>
  );
}

export default Qrcode;
