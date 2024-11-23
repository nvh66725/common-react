import { useIsFetching } from "@tanstack/react-query";
import { Menu } from "antd";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const items = [
  { key: "/home", label: "Homepage" },
  {
    key: "/introduction",
    label: "Introduction",
    children: [
      { key: "/introduction/greeting", label: "Greeting" },
      { key: "/introduction/president", label: "President" },
    ],
  },
  {
    key: "/club",
    label: "Club",
    children: [
      { key: "/club/forever", label: "Forever" },
      { key: "/club/company", label: "Company" },
    ],
  },
];

export const PageLayout = () => {
  const isFetching = useIsFetching();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

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
