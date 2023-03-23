import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

export default function App() {
  return (
    <>
      <div data-cy="header" className="h-[105px] w-full bg-primary">
        <div className="flex items-center h-full container">
          <h1 data-cy="header-title" className="font-bold text-2xl text-white">
            TO DO LIST APP
          </h1>
        </div>
      </div>
      <RouterProvider router={router} />
    </>
  );
}
