import { createBrowserRouter } from "react-router-dom";
import Detail from "../components/Detail";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);

export default router;
