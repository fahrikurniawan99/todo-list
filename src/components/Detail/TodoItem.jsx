import clsx from "clsx";
import { AlertTriangle, Loader2, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import Modal from "../Modal";
import FormUpdateTodo from "./FormUpdateTodo";

const getPriorityClass = (priority) => {
  switch (priority) {
    case "very-high":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "normal":
      return "bg-teal-500";
    case "low":
      return "bg-blue-500";
    case "very-low":
      return "bg-indigo-500";
    default:
      return "";
  }
};

export default function TodoItem({
  title,
  priority,
  isActive,
  onDelete,
  id,
  activeToggle,
  updateTodo,
}) {
  const [deleting, setDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  };

  const openModal = () => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  };

  const closeModalForm = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpenForm(false);
  };

  const openModalForm = () => {
    document.body.classList.add("overflow-hidden");
    setIsOpenForm(true);
  };

  return (
    <div
      data-cy="todo-item"
      className="h-[80px] w-full bg-white flex items-center px-7 rounded-xl shadow-lg"
    >
      <input
        data-cy="todo-item-checkbox"
        type="checkbox"
        className="mr-5 w-5 aspect-square"
        checked={isActive === 1 ? false : true}
        onChange={(e) =>
          activeToggle({ is_active: e.target.checked ? 0 : 1, id })
        }
      />
      <div
        className={clsx(
          "h-3 aspect-square rounded-full mr-5",
          getPriorityClass(priority)
        )}
      ></div>
      <h2
        data-cy="todo-title"
        className={clsx(
          "text-lg font-medium flex gap-5 items-center",
          !isActive && "line-through"
        )}
      >
        {title}
        <button
          onClick={openModalForm}
          className="text-gray-500 cursor-pointer"
        >
          <Pencil size={16} />
        </button>
      </h2>
      <button
        data-cy="todo-item-delete-button"
        onClick={openModal}
        className="ml-auto text-gray-500 cursor-pointer"
      >
        <Trash2 />
      </button>
      <FormUpdateTodo
        isOpen={isOpenForm}
        onClose={closeModalForm}
        title={title}
        onUpdate={updateTodo}
        id={id}
        priority={priority}
      />
      <Modal isOpen={isOpen}>
        <div className="max-w-[490px] w-[90%] bg-white h-[355px] rounded-xl">
          <AlertTriangle className="mx-auto mt-8 text-secondary" size={70} />
          <p className="font-medium text-lg px-14 text-center my-10">
            Apakah anda yakin menghapus activity “
            <span className="font-bold">{title}</span>”?
          </p>
          <div className="flex items-center justify-center gap-3 mt-14">
            <button
              onClick={closeModal}
              className="bg-gray-100 text-gray-700 font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full"
            >
              Batal
            </button>
            <button
              data-cy="modal-delete-confirm-button"
              disabled={deleting}
              onClick={() => onDelete({ id, setDeleting, closeModal })}
              className="bg-secondary text-white font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full disabled:opacity-50 flex items-center justify-center"
            >
              {deleting && (
                <Loader2
                  className="animate-spin mr-2"
                  size={18}
                  strokeWidth={3}
                />
              )}
              Hapus
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
