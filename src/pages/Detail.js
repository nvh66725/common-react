import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Descriptions } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { https } from "../api";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["detail", id],
    queryFn: () => https.get(`/posts/${id}`),
    select: (data) =>
      Object.entries(data.data).map(([key, value]) => ({
        label: key.toUpperCase(),
        children: value,
      })),
  });

  const nextNumber = Number(id) + 1;
  const prevNumber = Number(id) - 1;

  const next = () => navigate(`../${nextNumber}`, { relative: "path" });

  const prev = () => navigate(`../${prevNumber}`, { relative: "path" });

  return (
    <div>
      <Descriptions title={`Post details: ${id}`} items={data} bordered />
      <Button onClick={() => navigate("..")}>List</Button>
      {prevNumber > 0 && (
        <Button type="link" onClick={prev} icon={<CaretLeftOutlined />}>
          {prevNumber}
        </Button>
      )}
      {nextNumber <= 100 && (
        <Button
          type="link"
          onClick={next}
          icon={<CaretRightOutlined />}
          iconPosition="end"
        >
          {nextNumber}
        </Button>
      )}
    </div>
  );
};

export default Detail;
