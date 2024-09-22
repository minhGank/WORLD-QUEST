import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import RootLayout from "./pages/RootLayout.jsx";
import Quest from "./pages/Quest.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChallengePage from "./pages/ChallengePage.jsx";
const queryClient = new QueryClient();

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
      { path: "/quest_location/:questId", element: <Quest /> },
      { path: "/adventure/:challengeId", element: <ChallengePage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
