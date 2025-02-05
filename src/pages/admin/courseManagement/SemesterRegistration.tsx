import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement";
import { TResponse } from "../../../types";
import { toast } from "sonner";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  //   const academicSemesterOptions = academicSemester?.data?.map((item) => ({
  //     value: item._id,
  //     label: `${item.name} ${item.year}`,
  //   }));
  //* solving not undefined ts error
  const academicSemesterOptions = academicSemester?.data
    ? academicSemester.data.map((item) => ({
        value: item._id,

        label: `${item.name} ${item.year}`,
      }))
    : [];

  console.log(academicSemester);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),//! converting to number to maintain the backend provided structure
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);

    try {
      console.log(semesterData);
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span="6">
        <PHForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
