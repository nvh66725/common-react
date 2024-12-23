import { createBrowserRouter, Navigate } from "react-router-dom";
import { PageLayout } from "../components/layouts/PageLayout";
import Detail from "../pages/Detail";
import Homepage from "../pages/Homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { path: "", element: <Navigate replace to="home" /> },
      { path: "home", element: <Homepage /> },
      { path: "home/:id", element: <Detail /> },
      { path: "mail", element: <>Mail</> },
      { path: "mail/create", element: <>Create</> },
      { path: "mail/inbox", element: <>Inbox</> },
      { path: "inventory", element: <>Inventory</> },
      { path: "inventory/nft", element: <>NFT</> },
      { path: "inventory/non-nft", element: <>non-NFT</> },
    ],
  },
]);
