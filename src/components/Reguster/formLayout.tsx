import React, { type ReactNode } from "react";

function FormLayout({ children }: { children: ReactNode }) {
  return (

      <div className="bg-white dark:bg-[#242a38]  rounded-2xl  p-6  w-[330px]  ">
      <div className="flex flex-col gap-5 ">{children}</div>
    </div>

  );
}

export default FormLayout;
