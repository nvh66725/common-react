import { useQuery } from "@tanstack/react-query";
import { DatePicker, Table } from "antd";
import { useState } from "react";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useQuery({
    queryKey: ["post", page],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      )
        .then((res) => res.json())
        .then((data) => data),
  });

  console.log(data);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Content", dataIndex: "body", key: "body" },
  ];

  return (
    <>
      <DatePicker />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ total: 100, defaultCurrent: page, onChange: setPage }}
      />
    </>
  );
};

export default Homepage;
