import clsx from "clsx";
import React from "react";

export default function Modal({ children, isOpen, onClose }) {
  return (
    <div
      data-cy="modal"
      className={clsx(
        "fixed inset-0 h-screen w-full flex justify-center items-center z-[999]",
        !isOpen ? "hidden" : "block"
      )}
    >
      {children}
      <div
        data-cy="activity-item-delete-button"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 transition-all duration-300 h-screen w-full -z-10 cursor-pointer"
      ></div>
    </div>
  );
}
