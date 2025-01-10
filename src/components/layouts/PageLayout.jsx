import { useIsFetching } from "@tanstack/react-query";
import { Menu } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const items = [
  { key: "/home", label: "Homepage" },
  {
    key: "/mail",
    label: "Mail",
    children: [
      { key: "/mail/create", label: "Create" },
      { key: "/mail/inbox", label: "Inbox" },
    ],
  },
  {
    key: "/inventory",
    label: "Inventory",
    children: [
      { key: "/inventory/nft", label: "NFT" },
      { key: "/inventory/non-nft", label: "non-NFT" },
    ],
  },
];

export const PageLayout = () => {
  const isFetching = useIsFetching();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cursor = isFetching ? "progress" : "default";
    document.documentElement.style.cursor = cursor;
  }, [isFetching]);

  const handleNavigate = (item) => {
    navigate(item.key);
  };

  return (
    <div>
      <Menu
        mode="horizontal"
        items={items}
        selectedKeys={location.pathname}
        onClick={handleNavigate}
      />
      <Outlet />
    </div>
  );
};
