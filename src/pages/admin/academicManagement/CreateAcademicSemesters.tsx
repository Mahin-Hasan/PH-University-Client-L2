import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const nameOptions = [
  {
    value: "01",
    label: "Autumn",
  },
  {
    value: "02",
    label: "Summar",
  },
  {
    value: "03",
    label: "Fall",
  },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  // generating year options
  value: String(currentYear + number), // converting to string as type declared as string
  label: String(currentYear + number),
}));

const CreateAcademicSemesters = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    const name = nameOptions[Number(data?.name) - 1]?.label; // extracting session from code eg : 01 | 02 | 03

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span="6">
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />

          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemesters;
