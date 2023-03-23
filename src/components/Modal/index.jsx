import clsx from "clsx";
import React from "react";

export default function Modal({ children, isOpen }) {
  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black/50 transition-all duration-300 h-screen w-full flex justify-center items-center z-[999]",
        !isOpen ? "hidden" : "block"
      )}
    >
      {children}
    </div>
  );
}
