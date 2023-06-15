import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home/Home";
import { Employees } from "./pages/employees/Employees";
import { Tasks } from "./pages/tasks/Tasks";
import { CurrentPage } from "./pages/current/CurrentPage";


const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "employees", element: <Employees /> },
      { path: "tasks", element: <Tasks /> },
      { path: "employees/:id", element: <CurrentPage /> },
    ],
  },
]);

export const Routs = () => {
  return <RouterProvider router={router} />;
};