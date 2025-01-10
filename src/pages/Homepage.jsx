import { useQuery } from "@tanstack/react-query";
import { Button, Select, Table } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { https } from "../api";

const languages = [
  { value: "vi", label: "Việt Nam" },
  { value: "en", label: "English" },
];

const Homepage = () => {
  const { t, i18n } = useTranslation();
  const [params, setParams] = useSearchParams();
  const page = params.get("page") ?? 1;
  const pageSize = params.get("pageSize") ?? 5;
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
    setParams((prev) => ({ ...prev, page, pageSize }));
    Promise.all([true && fetch("")])
      .then(() => null)
      .catch((error) => error);
  };

  const [currentValue, setCurrentValue] = useState(2017);
  const start = 1998;
  const end = 2030;
  const visiblePages = 5;

  const years = useMemo(() => {
    const numbers = [];
    const step = start <= end ? 1 : -1;

    for (
      let index = start;
      step === 1 ? index <= end : index >= end;
      index += step
    ) {
      numbers.push(index);
    }

    return numbers;
  }, [start, end]);

  const currentIndex = years.indexOf(currentValue);

  const groupedYears = useMemo(() => {
    const startIndex = Math.floor(currentIndex / visiblePages) * visiblePages;
    return years.slice(startIndex, startIndex + visiblePages);
  }, [years, currentIndex]);

  return (
    <>
      <div>{t("hello")}</div>
      <Select
        options={languages}
        value={i18n.language}
        onChange={(value) => i18n.changeLanguage(value)}
      />
      <div className="flex gap-2">
        <Button
          disabled={currentIndex <= 5}
          onClick={() => setCurrentValue(years[Math.max(currentIndex - 5, 0)])}
        >
          Previous 5 pages
        </Button>
        <Button
          disabled={currentValue === years[0]}
          onClick={() => setCurrentValue(currentValue - 1)}
        >
          Prev
        </Button>
        {groupedYears.map((year) => (
          <Button key={year} onClick={() => setCurrentValue(year)}>
            <span style={{ color: year === currentValue ? "red" : "" }}>
              {year}
            </span>
          </Button>
        ))}
        <Button
          disabled={currentValue === years[years.length - 1]}
          onClick={() => setCurrentValue(currentValue + 1)}
        >
          Next
        </Button>
      </div>
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
