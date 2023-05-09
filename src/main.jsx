import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import App from "./App";
import AddChocolates from "./components/AddChocolates";
import UpdateChocolate from "./components/UpdateChocolate";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: () =>
          fetch(
            "https://chocolate-management-server-hnmahamud.vercel.app/chocolates"
          ),
      },
      {
        path: "/add-chocolates",
        element: <AddChocolates></AddChocolates>,
      },
      {
        path: "/update-chocolates/:id",
        element: <UpdateChocolate></UpdateChocolate>,
        loader: ({ params }) =>
          fetch(
            `https://chocolate-management-server-hnmahamud.vercel.app/chocolates/${params.id}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
