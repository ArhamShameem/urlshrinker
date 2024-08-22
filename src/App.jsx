import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layouts";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Links from "./pages/link";
import Redirectlink from "./pages/redirectlink";
import UrlProvider from "./context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: <Links />,
      },
      {
        path: "/:id",
        element: <Redirectlink />,
      },
    ],
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
