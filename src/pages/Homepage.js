import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { useState } from "react";
import { https } from "../api";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data } = useQuery({
    queryKey: ["post", page, pageSize],
    queryFn: () =>
      https.get("/posts", { params: { _page: page, _limit: pageSize } }),
    select: (data) => ({
      elements: data.data,
      total: data.headers["x-total-count"],
    }),
  });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "body", key: "body" },
  ];

  const handlePaginationChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.elements}
        pagination={{
          total: data?.total,
          current: page,
          pageSize,
          position: ["topCenter"],
          pageSizeOptions: [5, 10, 20],
          onChange: handlePaginationChange,
        }}
      />
    </>
  );
};

export default Homepage;
