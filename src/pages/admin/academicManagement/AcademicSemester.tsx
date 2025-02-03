import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined); // must pass undefined or else redux will give error

  console.log(data);

  return (
    <div>
      <h1>This is Academic semester compo</h1>
    </div>
  );
};

export default AcademicSemester;
