import React from "react";

export default function ToolDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute  flex w-fit h-full items-center justify-center rounded-[8px] bg-white text-[12px] text-black lg:text-[12px]">
      <div className="absolute -bottom-1 left-2 aspect-square w-[10px] rotate-45 bg-white"></div>
      {children}
    </div>
  );
}
