import { Loader2, Plus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import makeRequest from "../../lib/makeRequest";
import SpinnerCenter from "../spinner-center";
import Activity from "./Activity";

export default function Home() {
  const [activityGroups, setActivityGroups] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getActivityGroup = useCallback(async () => {
    const response = await makeRequest.get(
      "/activity-groups?email=fahri@gmail.com"
    );
    setActivityGroups(response.data.data);
  }, []);

  useEffect(() => {
    getActivityGroup();

    return () => {};
  }, [getActivityGroup]);

  const addActivityGroup = async () => {
    setIsLoading(true);
    try {
      await makeRequest.post("/activity-groups", {
        email: "fahri@gmail.com",
        title: "New Activity",
      });
      getActivityGroup();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteActivityGroup = async ({ id, setDeleting, closeModal }) => {
    setDeleting(true);
    try {
      await makeRequest.delete(`/activity-groups/${id}`);
      closeModal();
      getActivityGroup();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      data-cy="home"
      className="bg-gray-100 min-h-[calc(100vh-105px)] h-auto"
    >
      <div className="container">
        <div className="flex justify-between items-center h-[150px]">
          <h1 className="text-4xl font-bold">Activity</h1>
          <button
            disabled={isLoading}
            onClick={addActivityGroup}
            className="bg-primary text-white font-semibold min-w-[150px] px-5 py-3 w-fit rounded-full disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2
                className="animate-spin mr-2"
                size={18}
                strokeWidth={3}
              />
            ) : (
              <Plus className="mr-2" />
            )}
            Tambah
          </button>
        </div>
        {!activityGroups ? (
          <SpinnerCenter />
        ) : activityGroups?.length ? (
          <div className="grid grid-cols-4 gap-5 pb-10">
            {activityGroups?.map((activity) => (
              <Activity
                title={activity.title}
                date={activity.created_at}
                id={activity.id}
                onDelete={deleteActivityGroup}
              />
            ))}
          </div>
        ) : (
          <div onClick={addActivityGroup} className="flex justify-center pb-10">
            <img
              alt="activity-empty"
              src="/activity-empty-state.svg"
              className="mt-10 cursor-pointer"
              onClick={addActivityGroup}
            />
          </div>
        )}
      </div>
    </div>
  );
}
