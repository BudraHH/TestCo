import { useLocation } from "react-router-dom";
import CodingAssessment from "./assessment_components/CodingAssessment.jsx";
import MCQAssessment from "./assessment_components/MCQassessment.jsx";

const InstructorAddNewAssessmentType = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assessmentType = queryParams.get("type");

  console.log("Assessment-type: ", assessmentType);

  if (assessmentType === "MCQ") {
    return (
      <MCQAssessment/>
    );
  }

  if (assessmentType === "Coding") {
    return <CodingAssessment />;
  }

};

export default InstructorAddNewAssessmentType;
