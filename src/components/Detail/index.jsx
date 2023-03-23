import { ChevronLeft, Loader2, Pencil, Plus, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import makeRequest from "../../lib/makeRequest";
import Modal from "../Modal";
import SpinnerCenter from "../spinner-center";
import TodoItem from "./TodoItem";

export default function Detail() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    priority: priorityOptions[0],
  });

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  };

  const openModal = () => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  };

  const getActivity = useCallback(async () => {
    const response = await makeRequest(`/activity-groups/${id}`);
    setActivity(response.data);
  }, []);

  useEffect(() => {
    getActivity();
    return () => {};
  }, [getActivity]);

  const saveTodoItem = async () => {
    setIsSaving(true);
    try {
      await makeRequest.post(`/todo-items`, {
        activity_group_id: id,
        priority: form.priority.value,
        title: form.title,
      });
      getActivity();
      resetForm();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTodoItem = async ({ id, setDeleting, closeModal }) => {
    setDeleting(true);
    try {
      await makeRequest.delete(`/todo-items/${id}`);
      getActivity();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const updateIsActive = async ({ id, is_active }) => {
    await makeRequest.patch(`/todo-items/${id}`, { is_active });
    getActivity();
  };

  const resetForm = () => {
    setForm({
      title: "",
      priority: priorityOptions[0],
    });
  };

  const updateTodoItem = async ({ form, setIsLoading, id, closeModal }) => {
    setIsLoading(true);
    await makeRequest.patch(`/todo-items/${id}`, {
      ...form,
      priority: form.priority.value,
    });
    getActivity();
    setIsLoading(false);
    closeModal();
  };

  return (
    <div
      data-cy="detail"
      className="bg-gray-100 min-h-[calc(100vh-105px)] h-auto"
    >
      <div className="container">
        {!activity ? (
          <SpinnerCenter className={"h-[calc(100vh-105px)]"} />
        ) : (
          <>
            <div className="flex justify-between items-center h-[150px]">
              <div className="flex items-center">
                <Link to="/">
                  <ChevronLeft size={40} strokeWidth={4} className="mr-3" />
                </Link>
                {!isEdit ? (
                  <h1
                    onClick={() => setIsEdit(true)}
                    className="text-4xl font-bold flex items-center gap-3 cursor-pointer"
                  >
                    {title ? title : activity.title}
                    <Pencil className="text-gray-500" size={30} />
                  </h1>
                ) : (
                  <div className="flex items-center">
                    <input
                      autoFocus
                      className="border-b h-[60px] border-gray-400 bg-transparent outline-none text-4xl font-bold"
                      defaultValue={activity?.title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={async (e) => {
                        await makeRequest.patch(`/activity-groups/${id}`, {
                          title: title,
                        });
                        setIsEdit(false);
                        getActivity();
                      }}
                    />
                    <Pencil
                      className="text-gray-500 cursor-pointer"
                      size={30}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={openModal}
                className="bg-primary text-white font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full disabled:opacity-50 flex items-center justify-center"
              >
                <Plus className="mr-2" />
                Tambah
              </button>
            </div>
            {!activity?.todo_items?.length ? (
              <div onClick={openModal} className="flex justify-center pb-10">
                <img
                  alt="todo-empty"
                  src="/todo-empty-state.svg"
                  className="mt-10 cursor-pointer"
                />
              </div>
            ) : (
              <div className="space-y-3 pb-10">
                {activity?.todo_items?.map((item) => (
                  <TodoItem
                    title={item.title}
                    isActive={item.is_active}
                    priority={item.priority}
                    id={item.id}
                    onDelete={deleteTodoItem}
                    activeToggle={updateIsActive}
                    updateTodo={updateTodoItem}
                  />
                ))}
              </div>
            )}
          </>
        )}
        <Modal isOpen={isOpen}>
          <div className="w-[95%] max-w-[804px] bg-white rounded-xl">
            <div className="px-8 py-6 flex items-center justify-between">
              <h1 className="font-semibold text-lg">Tambahkan List Item</h1>
              <X
                className="text-gray-500 cursor-pointer"
                size={20}
                onClick={() => {
                  closeModal();
                  resetForm();
                }}
              />
            </div>
            <div className="px-8 py-6 border-t">
              <div>
                <label htmlFor="title" className="font-semibold text-xs">
                  NAMA LIST ITEM
                </label>
                <input
                  value={form.title}
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
                  value={form.priority}
                />
              </div>
            </div>
            <div className="px-8 py-6 border-t flex justify-end">
              <button
                disabled={isSaving || form.title === ""}
                onClick={saveTodoItem}
                className="bg-primary text-white font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full disabled:opacity-50 flex items-center justify-center"
              >
                {isSaving && (
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
      </div>
    </div>
  );
}

export const priorityOptions = [
  {
    value: "very-high",
    label: (
      <div className="flex items-center h-full w-full">
        <div className="h-3 aspect-square mr-2 rounded-full bg-red-500"></div>
        <span>Very High</span>
      </div>
    ),
  },
  {
    value: "high",
    label: (
      <div className="flex items-center h-full w-full">
        <div className="h-3 aspect-square mr-2 rounded-full bg-orange-500"></div>
        <span>High</span>
      </div>
    ),
  },
  {
    value: "normal",
    label: (
      <div className="flex items-center h-full w-full">
        <div className="h-3 aspect-square mr-2 rounded-full bg-teal-500"></div>{" "}
        <span>Medium</span>
      </div>
    ),
  },
  {
    value: "low",
    label: (
      <div className="flex items-center h-full w-full">
        <div className="h-3 aspect-square mr-2 rounded-full bg-blue-500"></div>{" "}
        <span>Low</span>
      </div>
    ),
  },
  {
    value: "very-low",
    label: (
      <div className="flex items-center h-full w-full">
        <div className="h-3 aspect-square mr-2 rounded-full bg-indigo-500"></div>
        <span> Very Low</span>
      </div>
    ),
  },
];
