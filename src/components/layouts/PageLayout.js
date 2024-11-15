import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";

export const PageLayout = ({ children }) => {
  const isFetching = useIsFetching();

  useEffect(() => {
    const cursor = isFetching ? "progress" : "default";
    document.documentElement.style.cursor = cursor;
  }, [isFetching]);

  return children;
};
