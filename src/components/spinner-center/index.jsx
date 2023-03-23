import clsx from "clsx";
import { Loader2 } from "lucide-react";
import React from "react";

export default function SpinnerCenter({ className }) {
  return (
    <div
      datatype="spinner-center"
      className={clsx(
        "h-[calc(100vh-255px)] flex justify-center items-center",
        className
      )}
    >
      <Loader2 className="text-primary animate-spin" size={40} />
    </div>
  );
}
