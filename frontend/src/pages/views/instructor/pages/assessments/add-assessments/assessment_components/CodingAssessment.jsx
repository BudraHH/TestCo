import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backendApi from "../../../../../../../backendAPI/index.js";
import { motion } from "framer-motion";

const TestCases = ({ testCasesNumber, questionNumber }) => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: testCasesNumber }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <p className="text-myColor-secondary font-semibold text-sm">
            Test Case {index}
          </p>
          <div className="w-full bg-myColor-extraLight rounded-lg p-4 flex flex-col gap-2">
            {/* Inputs */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor={`inputs-${questionNumber}-${index}`}
                className="text-myColor-secondary font-semibold text-sm"
              >
                Inputs
              </label>
              <input
                className="w-full h-[3rem] px-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
                id={`inputs-${questionNumber}-${index}`}
                type="text"
                placeholder="Enter the inputs"
              />
            </div>
            {/* Outputs */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor={`expected-outputs-${questionNumber}-${index}`}
                className="text-myColor-secondary font-semibold text-sm"
              >
                Expected Outputs
              </label>
              <input
                className="w-full h-[3rem] px-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-myColor-primary transition-all"
                id={`expected-outputs-${questionNumber}-${index}`}
                type="text"
                placeholder="Enter the expected outputs"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProblemStatement = ({ testCasesNumber, handleNumTestCasesChange, questionNumber }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Problem Statement Section */}
      <div className="flex flex-col gap-3 rounded-lg p-4 bg-palatte-extraLight">
        <label
          htmlFor={`problem-statement-${questionNumber}`}
          className="text-myColor-secondary font-semibold text-lg"
        >
          Problem Statement {questionNumber+1}
        </label>
        <textarea
          name={`problem-statement-${questionNumber}`}
          id={`problem-statement-${questionNumber}`}
          rows="8"
          placeholder="Write the problem statement here..."
          className="w-full p-4 text-myColor-dark bg-white border border-myColor-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-myColor-primary transition duration-200 shadow-sm resize-none scrollbar-hide"
        ></textarea>
      </div>

      {/* Test Cases Section */}
      <div className="flex flex-col gap-3 rounded-lg p-4 bg-palatte-extraLight">
        <div className="flex flex-row justify-between items-center rounded-lg">
          <label
            htmlFor="test-cases"
            className="sm:w-7/12 md:w-6/12 text-myColor-secondary font-semibold text-lg bg-myColor-warning"
          >
            Problem Statement {questionNumber+1} : Test Cases
          </label>
          <select
            id={`test-cases-number-${questionNumber}`}
            name={`test-cases-number-${questionNumber}`}
            value={testCasesNumber}
            onChange={(e) => handleNumTestCasesChange(e, questionNumber)}
            className="sm:w-5/12 md:w-6/12 lg:w-[20rem] bg-white text-myColor-primary border border-myColor-medium rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-myColor-medium transition-all cursor-pointer"
          >
            {Array.from({length: 5}, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
            ))}
          </select>
        </div>

        {testCasesNumber ? (
          <div className="w-full flex flex-col rounded-lg bg-myColor-light p-4 gap-5">
            <TestCases testCasesNumber={parseInt(testCasesNumber)} questionNumber={questionNumber} />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center rounded-lg bg-white p-4 gap-2">
            <h1 className={`font-light text-lg`}>
              Select the number of test cases to be visible!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const CodingAssessment = () => {
  const [testCasesNumbers, setTestCasesNumbers] = useState({});
  const [numQuestions, setNumQuestions] = useState(1);
  const navigate = useNavigate();

  const handleNumTestCasesChange = (e, questionIndex) => {
    setTestCasesNumbers({
      ...testCasesNumbers,
      [questionIndex]: e.target.value,
    });
  };

  const handleNumQuestionsChange = (e) => {
    const newNumQuestions = parseInt(e.target.value);
    setNumQuestions(newNumQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assessmentData = {
      assessmentType: "Coding",
      title: document.getElementById("assessment-title")?.value || "", // Use optional chaining to safely get value
      numQuestions: numQuestions,
      questions: Array.from({ length: numQuestions }).map((_, index) => {
        const problemStatement = document.getElementById(`problem-statement-${index}`).value || "";
        const testCases = Array.from({ length: testCasesNumbers[index] || 0 }).map((_, testCaseIndex) => {
          const input = document.getElementById(`inputs-${index}-${testCaseIndex}`)?.value || "";
          const expectedOutput = document.getElementById(`expected-outputs-${index}-${testCaseIndex}`)?.value || "";
          
          
          return { input, expectedOutput };
          
        });
        console.log(testCases)
        return { problemStatement, testCases };
      })
    };

    try {
      const response = await fetch(backendApi.createCodingAssessment.url, {
        method: backendApi.createCodingAssessment.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assessmentData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Assessment created successfully!");
        // navigate(`/instructor/assessments`);
      } else {
        alert(`Failed to create assessment: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating assessment:", error);
      alert("An error occurred while creating the assessment.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
          className="overflow-y-auto sm:max-h-[35rem] md:max-h-[35rem] lg:max-h-[40rem] scrollbar-hide flex flex-col gap-5 rounded-lg">
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <div
              className="w-full flex flex-col lg:flex-row justify-between items-center rounded-lg bg-palatte-primary2 p-5">
            <label
                className="w-full lg:w-4/12 text-palatte-medium font-medium "
                htmlFor="assessment-title"
            >
              Assessment Title
            </label>
            <input
                type="text"
                placeholder="Enter assessment title"
                id="assessment-title"
                className="w-full lg:w-9/12 px-4 py-2 text-palatte-dark bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4"
            />
          </div>
          <div
              className="w-full flex sm:flex-col lg:flex-row justify-between items-center rounded-lg bg-palatte-primary2 p-5">
            <label
                htmlFor="num-questions"
                className="w-full lg:w-4/12 text-palatte-medium font-semibold"
            >
              Number of Questions
            </label>
            <select
                id="num-questions"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                className="cursor-pointer w-full  lg:w-9/12 p-2 text-palatte-primary bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4 transition-all"
            >
              {Array.from({length: 5}, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
              ))}
            </select>
          </div>
        </div>

        <div
            id="scheduling-section"
            className="bg-palatte-primary2 rounded-lg p-5 gap-5"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between items-center gap-5">
              {/* Start Date & Time */}
              <div className="flex flex-col w-full gap-2">
                <label className="text-palatte-medium font-semibold">
                  Start Date
                </label>
                <input
                    type="date"
                    id="start-date"
                    className="w-full p-2 text-palatte-dark bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label className="text-palatte-medium font-semibold">
                  Start Time
                </label>
                <input
                    type="time"
                    id="start-time"
                    className="w-full p-2 text-palatte-dark bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4"
                />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-5 ">
              {/* End Date & Time */}
              <div className="flex flex-col w-full gap-2">
                <label className="text-palatte-medium font-semibold">
                  End Date
                </label>
                <input
                    type="date"
                    id="end-date"
                    className="w-full p-2 text-palatte-dark bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4"
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label className="text-palatte-medium font-semibold">
                  End Time
                </label>
                <input
                    type="time"
                    id="end-time"
                    className="w-full p-2 text-palatte-dark bg-white border border-palatte-medium rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-primary4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg bg-palatte-light p-4">
          {/* Render ProblemStatements for Each Question */}
          {Array.from({length: numQuestions}).map((_, index) => (
              <div key={index} className="mb-3">
                <ProblemStatement
                    testCasesNumber={testCasesNumbers[index] || ""}
                    handleNumTestCasesChange={handleNumTestCasesChange}
                    questionNumber={index}
                />
              </div>
          ))}
          <motion.button
              whileTap={{scale: 0.95}}
              type="submit"
              className={`w-full h-[3rem] bg-palatte-primary2 text-white hover:bg-palatte-secondary rounded-lg cursor-pointer font-bold}`}
          >
            Submit
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default CodingAssessment;
