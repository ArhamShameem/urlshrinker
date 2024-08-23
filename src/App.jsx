import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layouts";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Links from "./pages/link";
import Redirectlink from "./pages/redirectlink";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";

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
        element: (
          <RequireAuth>
            <Dashboard />,
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Links />,
          </RequireAuth>
        ),
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
