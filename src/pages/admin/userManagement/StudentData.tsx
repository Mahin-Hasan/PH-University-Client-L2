import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "name" | "fullName">; // using pick we can create new type by selecting required type from an existing type

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery(params); //? passing query for search params dynamically

  // console.log(studentData);

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id, //? must use key or will give error
    fullName,
    id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Roll No",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%", //! takes proper spacing
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

export default StudentData;
