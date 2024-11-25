import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { styles } from "../../../../../../styles.js";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../../../utils/motion.js";

const InstructorAddNewAssessment = () => {
  const [assessmentType, setAssessmentType] = useState(""); // Single value for selection
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setAssessmentType("");
  },[]);

  useEffect(() => {
    // Redirect to the default page if no assessment type is selected
    if (!assessmentType) {
      navigate(`/instructor/assessments/add-new-assessment`);
    }
  }, [assessmentType, navigate]);

  const handleChange = async (e) => {
    const selectedType = e.target.value;
    setAssessmentType(selectedType);
    if (!selectedType) {
      navigate(`/instructor/assessments/add-new-assessment`);
    } else if (["MCQ", "Coding"].includes(selectedType)) {
      navigate(
        `/instructor/assessments/add-new-assessment/assessment-type?type=${selectedType}`
      );
    } else {
      setError("Invalid assessment type selected.");
      setAssessmentType(""); // Reset to empty if invalid
    }
  };

  const goBack = async () => {
    navigate(`/instructor/assessments/add-new-assessment`);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Section */}
      <div
          className="w-full h-[5rem] flex flex-col sm:flex-row justify-between items-center p-5 bg-palatte-primary1 rounded-lg">
        <h1 className={`font-bold text-lg sm:text-xl text-white`}>
          Assessments / {" "}
          <span className={`font-normal`}>add-new</span>
        </h1>
        <div className="flex flex-row justify-center items-center gap-5">
          <select
              id="assessment-type"
              name="assessment-type"
              value={assessmentType}
              onChange={handleChange}
              className="w-[20rem] sm:w-[8rem] md:w-[10rem] lg:w-[20rem] h-[3rem] bg-palatte-extraLight  text-myColor-primary border border-myColor-medium rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-myColor-medium transition-all cursor-pointer"
          >
            <option className={`cursor-pointer`} value="">
              --Select assessment type--
            </option>
            <option className={`cursor-pointer`} value="MCQ">
              MCQ
            </option>
            <option className={`cursor-pointer`} value="Coding">
              Coding
            </option>
          </select>

          <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.025 }}
              className={`sm:w-[4rem] md:w-[6rem] lg:w-[8rem] h-[3rem] text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg cursor-pointer`}
              onClick={goBack}
          >
            Back
          </motion.button>
        </div>
      </div>
      {/* Error Message */}
      {error && (
          <div className="w-full h-[10rem] flex justify-center items-center rounded-lg bg-red-100 p-4">
            <h1 className="text-red-500">{error}</h1>
          </div>
      )}
      {/* Instructional Message */}
      {!assessmentType && !error && (
        <div className="w-full h-[40rem] sm:h-[35rem] md:h-[35rem] lg:h-[40rem] p-5 rounded-lg bg-myColor-medium flex justify-center items-center">
          <h1
            className={`${styles.montserratLight} text-xl sm:text-lg md:text-xl text-white`}
          >
            Select the assessment type, to create one!
          </h1>
        </div>
      )}
      {/* Dynamic Child Route Render */}
      {assessmentType && !error && <Outlet />}
    </div>
  );
};

export default InstructorAddNewAssessment;
