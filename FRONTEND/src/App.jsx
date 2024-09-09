import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import RootLayout from "./pages/RootLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
