import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import { Employees } from "./pages/employees/Employees";
import { Tasks } from "./pages/tasks/Tasks";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "employees", element: <Employees /> },
      { path: "tasks", element: <Tasks /> },
    ],
  },
]);

export const Routs = () => {
  return <RouterProvider router={router} />;
};