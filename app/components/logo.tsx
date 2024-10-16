import React from "react";
import { cn } from "../libs/utils";

function logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-8 aspect-square  rounded-full flex items-center justify-center bg-primaryBlue",
        className
      )}
    >
      <span className="w-full h-1 bg-black" />
    </div>
  );
}

export default logo;
