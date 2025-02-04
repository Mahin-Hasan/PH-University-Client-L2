import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";
import { TQueryParam } from "../../../types";

export type TTableData = Pick<
  TAcademicSemester,
  "name" | "startMonth" | "endMonth" | "year"
>; // using pick we can create new type by selecting required type from an existing type

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  // const { data: semesterData } = useGetAllSemestersQuery(undefined); // must pass undefined or else redux will give error
  // const { data: semesterData } = useGetAllSemestersQuery([ { name: "name", value: "Summer" }]); //? may be tricky  passing query for search params filtering
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params); //? passing query for search params dynamically

  // console.log(semesterData);

  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id, //? must use key or will give error
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      // showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination, // ! using _ to remove error warning
    filters,
    _sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      // console.log(queryParams);
      setParams(queryParams);
    }
  };

  //* optional
  // if (isLoading) {
  //   return (
  //     <div>
  //       <h1>Loading..</h1>
  //     </div>
  //   );
  // }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
  // return (
  //   <div>
  //     <h1>This is Academic semester compo</h1>
  //   </div>
  // );
};

export default AcademicSemester;
