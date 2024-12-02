import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backendApi from "../../../../../../../backendAPI/index.js";
import { motion } from "framer-motion";

const TestCases = ({ testCasesNumber, questionNumber }) => {
  return (
      <div className="flex flex-col gap-5">
        {Array.from({ length: testCasesNumber }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2 w-full">
              <p className="text-gray-700 font-semibold text-sm">
                Test Case {index}
              </p>
              <div className="w-full bg-gray-100 rounded-lg p-4 flex flex-col gap-2">
                {/* Inputs */}
                <div className="flex flex-col gap-3">
                  <label
                      htmlFor={`inputs-${questionNumber}-${index}`}
                      className="text-gray-700 font-semibold text-sm"
                  >
                    Inputs
                  </label>
                  <input
                      className="w-full h-[3rem] px-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      id={`inputs-${questionNumber}-${index}`}
                      type="text"
                      placeholder="Enter the inputs"
                  />
                </div>
                {/* Outputs */}
                <div className="flex flex-col gap-3">
                  <label
                      htmlFor={`expected-outputs-${questionNumber}-${index}`}
                      className="text-gray-700 font-semibold text-sm"
                  >
                    Expected Outputs
                  </label>
                  <input
                      className="w-full h-[3rem] px-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
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
        <div className="flex flex-col gap-3 rounded-lg p-4 bg-gray-50">
          <label
              htmlFor={`problem-statement-${questionNumber}`}
              className="text-gray-700 font-semibold text-lg"
          >
            Problem Statement {questionNumber + 1}
          </label>
          <textarea
              name={`problem-statement-${questionNumber}`}
              id={`problem-statement-${questionNumber}`}
              rows="8"
              placeholder="Write the problem statement here..."
              className="w-full p-4 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200 shadow-sm resize-none scrollbar-hide"
          ></textarea>
        </div>

        {/* Test Cases Section */}
        <div className="flex flex-col gap-3 rounded-lg p-4 bg-gray-50">
          <div className="flex flex-row justify-between items-center rounded-lg">
            <label
                htmlFor="test-cases"
                className="sm:w-7/12 md:w-6/12 text-gray-700 font-semibold text-lg bg-yellow-200"
            >
              Problem Statement {questionNumber + 1} : Test Cases
            </label>
            <select
                id={`test-cases-number-${questionNumber}`}
                name={`test-cases-number-${questionNumber}`}
                value={testCasesNumber}
                onChange={(e) => handleNumTestCasesChange(e, questionNumber)}
                className="sm:w-5/12 md:w-6/12 lg:w-[20rem] bg-white text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all cursor-pointer"
            >
              {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
              ))}
            </select>
          </div>

          {testCasesNumber ? (
              <div className="w-full flex flex-col rounded-lg bg-gray-100 p-4 gap-5">
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
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [assessmentDescription, setAssessmentDescription] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [duration, setDuration] = useState(90);
  const [totalMarks, setTotalMarks] = useState(100);
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
      title: assessmentTitle,
      scheduledAt: scheduledAt,
      duration: duration,
      totalMarks: totalMarks,
      numQuestions: numQuestions,
      questions: Array.from({ length: numQuestions }).map((_, index) => {
        const problemStatement = document.getElementById(`problem-statement-${index}`).value || "";
        const testCases = Array.from({ length: testCasesNumbers[index] || 0 }).map((_, testCaseIndex) => {
          const input = document.getElementById(`inputs-${index}-${testCaseIndex}`)?.value || "";
          const expectedOutput = document.getElementById(`expected-outputs-${index}-${testCaseIndex}`)?.value || "";
          return { input, expectedOutput };
        });

        return { problemStatement, testCases };
      }),
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
        <div className="overflow-y-auto sm:max-h-[35rem] md:max-h-[35rem] lg:max-h-[40rem] scrollbar-hide flex flex-col gap-5 rounded-lg">
          {/* Title Section */}
          <div className="flex flex-row  gap-5">
            <div className="p-5 gap-5 w-full flex flex-col lg:flex-col justify-between items-center bg-palatte-extraLight rounded-lg">
              <div className="w-full flex flex-col gap-2 rounded-lg ">
                <label className="w-full lg:w-4/12 text-gray-700 font-medium" htmlFor="assessment-title">
                  Assessment Title
                </label>
                <input
                    type="text"
                    placeholder="Enter assessment title"
                    id="assessment-title"
                    value={assessmentTitle}
                    onChange={(e) => setAssessmentTitle(e.target.value)}
                    className="w-full  px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-secondary"
                />
              </div>
              <div className="w-full flex flex-col gap-2 rounded-lg  ">
                <label className="w-full lg:w-4/12 text-gray-700 font-medium" htmlFor="assessment-description">
                  Description
                </label>
                <textarea
                    id="assessment-description"
                    placeholder="Enter description"
                    value={assessmentDescription}
                    onChange={(e) => setAssessmentDescription(e.target.value)}
                    rows="4" // You can adjust the number of rows based on your needs
                    className="stylish-scrollbar w-full  px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-palatte-secondary resize-none"
                />
              </div>

            </div>

            {/* Scheduling Section */}
            <div id="scheduling-section" className="w-full bg-gray-200 rounded-lg p-5 gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center gap-5">
                  <div className="flex flex-col w-full gap-2">
                    <label className="text-gray-700 font-semibold">Start Date</label>
                    <input
                        type="date"
                        id="start-date"
                        value={scheduledAt ? scheduledAt.split("T")[0] : ""}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-2">
                    <label className="text-gray-700 font-semibold">Duration (mins)</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full gap-2">
                  <label className="text-gray-700 font-semibold">Total Marks</label>
                  <input
                      type="number"
                      id="total-marks"
                      value={totalMarks}
                      onChange={(e) => setTotalMarks(e.target.value)}
                      className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {/* Questions Section */}
                <div id="questions-section" className="">
                  <div className="flex flex-row justify-between items-center gap-5">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-gray-700 font-semibold">No. of Questions</label>
                      <input
                          type="number"
                          id="num-questions"
                          value={numQuestions}
                          onChange={handleNumQuestionsChange}
                          className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Problem Statement Section */}
          <div id="problem-statement-section" className="flex flex-col gap-5 p-5">
            {Array.from({length: numQuestions}).map((_, index) => (
                <ProblemStatement
                    key={index}
                    testCasesNumber={testCasesNumbers[index] || 0}
                    handleNumTestCasesChange={handleNumTestCasesChange}
                    questionNumber={index}
                />
            ))}
          </div>
        </div>

        <motion.div
            className="w-full flex justify-center mt-5"
            whileTap={{scale: 0.98}}
        >
          <button
              type="submit"
              className="w-full max-w-[20rem] p-3 text-center rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Assessment
          </button>
        </motion.div>
      </form>
  );
};

export default CodingAssessment;
