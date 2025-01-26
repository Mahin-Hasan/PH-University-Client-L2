import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined); // must pass undefined or else redux will give error

  console.log(data);

  return <div></div>;
};

export default AcademicSemester;
