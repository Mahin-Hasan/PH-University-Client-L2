import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentID } = useParams(); //! must use the same name as declared in route
  return (
    <div>
      <h1>This is student Details of {studentID}</h1>
    </div>
  );
};

export default StudentDetails;
