import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import Modal from "../Modal";
import { priorityOptions } from ".";
import ReactSelect from "react-select";

export default function FormUpdateTodo({
  isOpen,
  onClose,
  title,
  onUpdate,
  id,
  priority,
}) {
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => onClose();

  return (
    <Modal data-cy="form-update-todo" isOpen={isOpen}>
      <div className="w-[95%] max-w-[804px] bg-white rounded-xl z-[999]">
        <div className="px-8 py-6 flex items-center justify-between">
          <h1 className="font-semibold text-lg">Edit Item</h1>
          <X
            className="text-gray-500 cursor-pointer"
            size={20}
            onClick={onClose}
          />
        </div>
        <div className="px-8 py-6 border-t">
          <div>
            <label htmlFor="title" className="font-semibold text-xs">
              NAMA LIST ITEM
            </label>
            <input
              value={form?.title ?? title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              type="text"
              className="w-full outline-none border-2 rounded-md px-4 h-[52px] focus:border-blue-500 mt-2"
              placeholder="Tambahkan nama list item"
              id="title"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="title" className="font-semibold text-xs">
              PRIORITY
            </label>
            <ReactSelect
              options={priorityOptions}
              classNames={{
                container: () => "mt-2 w-[205px]",
                valueContainer: () => "h-[52px]",
                indicatorSeparator: () => "hidden",
              }}
              onChange={(e) => setForm({ ...form, priority: e })}
              value={
                form?.priority ??
                priorityOptions[
                  priorityOptions.findIndex((e) => e.value === priority)
                ]
              }
            />
          </div>
        </div>
        <div className="px-8 py-6 border-t flex justify-end">
          <button
            disabled={isLoading || form?.title === ""}
            onClick={() => onUpdate({ form, setIsLoading, id, closeModal })}
            className="bg-primary text-white font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading && (
              <Loader2
                className="animate-spin mr-2"
                size={18}
                strokeWidth={3}
              />
            )}
            Simpan
          </button>
        </div>
      </div>
    </Modal>
  );
}
