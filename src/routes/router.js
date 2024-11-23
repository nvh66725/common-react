import { createBrowserRouter, Navigate } from "react-router-dom";
import { PageLayout } from "../components/layouts/PageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: "", element: <Navigate replace to="home" /> },
      { path: "home", element: <>Homepage</> },
      { path: "introduction", element: <>Introduction</> },
      { path: "introduction/greeting", element: <>Greeting</> },
      { path: "introduction/president", element: <>President</> },
      { path: "club", element: <>Club</> },
      { path: "club/forever", element: <>Forever</> },
      { path: "club/company", element: <>Company</> },
    ],
  },
]);
