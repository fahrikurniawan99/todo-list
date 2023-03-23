import { format } from "date-fns";
import localeId from "date-fns/locale/id";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

export default function Activity({ title, date, onDelete, id }) {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  };

  const openModal = () => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  };

  return (
    <div
      data-cy="activity"
      className="h-[234px] rounded-xl shadow-lg bg-white w-full py-5 px-6 relative"
    >
      <div
        className="h-full w-full cursor-pointer"
        onClick={() => navigate(`/detail/${id}`)}
      >
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <div className="absolute w-full left-0 right-0 h-[60px] bottom-0 px-6 flex justify-between items-center ">
        <span className="text-gray-500 text-sm font-medium">
          {format(new Date(date), "dd MMMM yyyy", { locale: localeId })}
        </span>
        <label>
          <Trash2
            className="text-gray-500 cursor-pointer"
            size={22}
            onClick={openModal}
          />
        </label>
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
    </div>
  );
}
