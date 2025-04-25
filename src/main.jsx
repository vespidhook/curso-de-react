import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:id", // <--- aqui
    element: <TaskPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: (
      <div className="h-screen w-screen bg-slate-500 text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">404 - Página não encontrada</h1>
        <p className="mt-2 text-lg">Verifique o endereço e tente novamente.</p>
      </div>
    ),
  },
]);
