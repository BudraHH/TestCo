import { useEffect, useState, useCallback } from "react";
import CodeMirror, {
  oneDarkTheme,
} from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { python } from "@codemirror/lang-python";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

import backendApi from "../../../../../../../backendAPI/index.js";
import { fadeIn } from "../../../../../../../utils/motion.js";
import { motion } from "framer-motion";

const CodingAssessment = () => {
  const [code, setCode] = useState("# Write your code here");
  const [language, setLanguage] = useState("python");
  const [assessmentData, setAssessmentData] = useState(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [CurrentTestCaseNumber, setCurrentTestCaseNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(assessmentData);
  // Function to fetch coding assessment data
  const fetchCodingAssessmentData = useCallback(async () => {
    try {
      const response = await fetch(backendApi.codingAssessmentDataPull.url, {
        method: backendApi.codingAssessmentDataPull.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssessmentData(data?.data[0]?.codingAssessments || []); // Updated for handling array structure
    } catch (e) {
      console.error("Error fetching coding assessment data:", e.message);
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  }, []);

  // Fetch assessment data when the component mounts
  useEffect(() => {
    fetchCodingAssessmentData();
  }, [fetchCodingAssessmentData]);

  const languageExtensions = {
    javascript: javascript(),
    java: java(),
    cpp: cpp(),
    go: go(),
    python: python(),
  };

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Java", value: "java" },
    { name: "C/C++", value: "cpp" },
    { name: "Go", value: "go" },
    { name: "Python", value: "python" },
  ];

  const submitCode = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(backendApi.codeTestEvaluator.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
          problem: assessmentData[currentQuestionNumber - 1],
        }), // Pass current question data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const dataResponse = await response.json();
      console.log("Submission response:", dataResponse);
    } catch (error) {
      console.error("Error submitting the code:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-row gap-2 px-3 py-4 h-[100vh] w-[100vw] bg-palatte-dark">
      {/* Left Sidebar (problem statement) */}
      <div className="w-[4%] sm:w-[3%] md:w-[3%] lg:w-[3%] rounded-lg p-1 bg-palatte-light flex flex-col justify-start items-center gap-1">
        {assessmentData?.length > 0 ? (
          assessmentData.map((assessment, index) => (
            <motion.button
              variants={fadeIn("center", "", 0.25, 0.25)}
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.95 }}
              initial="hidden"
              animate="show"
              key={index}
              className={`w-[80%] md:w-[80%] lg:w-[90%] aspect-square flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-palatte-dark
          ${
            currentQuestionNumber - 1 === index
              ? "bg-palatte-dark"
              : "bg-palatte-secondary"
          }`}
              onClick={() => setCurrentQuestionNumber(index + 1)}
            >
              <p className="text-sm lg:text-base">{index + 1}</p>
            </motion.button>
          ))
        ) : (
          <p className="aspect-square flex justify-center items-center text-white bg-palatte-secondary rounded-lg cursor-pointer hover:bg-palatte-dark">
            nil
          </p>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full h-full overflow-hidden">
        {/* Left Section: Problem Statement */}
        <div
          className="sm:resize-y sm:min-h-30 md:resize-x  lg:resize-x w-full md:w-2/5 lg:w-6/12 overflow-auto scrollbar-hide h-full flex flex-col gap-2 p-2 bg-palatte-primary1 rounded-lg border border-palatte-medium
  "
          style={{ minWidth: "3/12", flexGrow: "2" }}
        >
          <div className="h-full p-4 bg-palatte-dark text-white rounded-lg border border-palatte-secondary">
            {/* Header */}
            <div className="border-b border-b-gray-600">
              <h2 className="text-start font-bold text-lg md:text-2xl mb-2">
                Problem Statement
              </h2>
            </div>

            <div className="overflow-auto scrollbar-hide">
              {/* Problem Statement */}
              <div className="flex flex-row border-b border-b-gray-600 py-5 w-full">
                <p className="text-sm md:text-md leading-relaxed break-words whitespace-normal max-w-full">
                  {assessmentData?.[currentQuestionNumber - 1]
                    ?.problemStatement || "loading..."}
                </p>
              </div>

              {/* Description */}
              <div className="flex flex-row py-5 w-full">
                <p className="text-sm md:text-md leading-relaxed break-words whitespace-normal max-w-full">
                  {assessmentData?.[currentQuestionNumber - 1]?.description ||
                    "Additional details unavailable."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Code Editor and Test Cases */}
        <div
          className="flex flex-col w-full h-full gap-2
      md:w-[60%] lg:w-[65%]"
        >
          {/* Code Editor */}
          <div
            className="resize-y overflow-auto flex flex-col p-2 bg-palatte-primary1 rounded-lg gap-5 border border-palatte-medium
  h-[60%] lg:h-[70%]"
            style={{ minHeight: "45%", maxHeight: "70%" }}
          >
            <div className="w-full h-full p-3 flex  flex-col sm:gap-2 mg:gap-2 lg:gap-2 bg-palatte-dark border border-palatte-secondary rounded-lg">
              <div className="flex justify-between items-center">
                <h1 className="text-base md:text-lg font-semibold text-gray-200">
                  Code Editor
                </h1>
                <div className="flex flex-row items-center gap-2">
                  <label className="mr-4 text-palatte-medium">Language:</label>
                  <select
                    className="px-3 py-2 bg-palatte-light text-palatte-dark rounded-lg focus:outline-none cursor-pointer hover:bg-palatte-extraLight"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {languages.map(({ name, value }) => (
                      <option key={value} value={value}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                className="rounded-lg overflow-scroll custom-scrollbar bg-palatte-primary2 border border-gray-600"
                style={{ height: "80%", width: "100%" }}
              >
                <CodeMirror
                  value={code}
                  extensions={[
                    languageExtensions[language],
                    keymap.of(defaultKeymap),
                  ]}
                  theme={oneDarkTheme}
                  onChange={(value) => setCode(value)}
                  height="400px" 
                  width="100%" 
                  options={{
                    lineWrapping: false, 
                    lineNumbers: true, // Show line numbers (optional)
                  }}
                />
              </div>

              <div className="flex flex-row justify-start items-center gap-2 h-[10%]">
                <motion.button
                  variants={fadeIn("center", "", 0.25, 0.25)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.95 }}
                  initial="hidden"
                  animate="show"
                  className="h-[5vh] sm:h-[25px] sm:w-[15%] md:h-[40px] w-[30%] md:w-[15%] bg-palatte-secondary text-sm text-md  text-gray-200 rounded-lg cursor-pointer hover:bg-amber-500 hover:text-white"
                >
                  Run
                </motion.button>
                <motion.button
                  variants={fadeIn("center", "", 0.25, 0.25)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.95 }}
                  initial="hidden"
                  animate="show"
                  className="h-[5vh] sm:h-[25px] sm:w-[15%] md:h-[40px] w-[30%] md:w-[15%] bg-palatte-secondary text-gray-200 text-sm text-md rounded-lg cursor-pointer hover:bg-green-700 hover:text-white"
                  onClick={submitCode}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div
            className="w-full bg-palatte-primary1 rounded-lg p-2 border border-palatte-medium h-[55%] sm:h-[45%] md:h-[40%] lg:h-[30%]"
            style={{
              flexGrow: 2,
              maxHeight: "55%",
            }}
          >
            <div className="h-full w-full rounded-lg border border-palatte-secondary bg-palatte-dark">
              <div className=" flex flex-row justify-between items-center p-2">
                <h2 className="text-white text-lg font-semibold">Test Cases</h2>
                <div className="flex flex-row gap-2 w-[5%]">
                  {assessmentData?.[currentQuestionNumber - 1]?.testCases?.map(
                    (_, index) => (
                      <motion.button
                        variants={fadeIn("center", "", 0.25, 0.25)}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.95 }}
                        initial="hidden"
                        animate="show"
                        key={index}
                        className={`flex justify-center items-center text-white rounded-lg cursor-pointer hover:bg-palatte-dark 
                ${
                  CurrentTestCaseNumber - 1 === index
                    ? "bg-palatte-dark"
                    : "bg-palatte-secondary"
                }
                w-full h-[40px] sm:h-[35px] md:h-[40px] lg:h-[40px]`}
                        onClick={() => setCurrentTestCaseNumber(index + 1)}
                      >
                        <p>{index + 1}</p>
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              <hr className="mx-2 border border-palatte-medium" />
              <div
                id="test-case-container"
                className="overflow-auto stylish-scrollbar p-4 w-full rounded-lg text-white bg-palatte-dark flex flex-col gap-2 lg:h-[calc(100%-4rem)] sm:h-[calc(90%-4rem)] md:h-[85%]"
              >
                <div className="flex flex-row justify-between items-center pb-2 border-b border-b-palatte-medium">
                  <p>Test Case {CurrentTestCaseNumber}</p>
                  <p>Status:</p>
                </div>
                <div className="flex flex-col gap-2">
                  {/* Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="test-case-inputs">Inputs</label>
                    <div
                      id="test-case-inputs"
                      className="p-2 w-full bg-palatte-medium border-2 border-palatte-extraLight rounded-lg text-palatte-dark max-h-40 overflow-y-auto"
                    >
                      <pre>
                        {assessmentData?.[currentQuestionNumber - 1]
                          ?.testCases?.[CurrentTestCaseNumber - 1].input ||
                          "inputs"}
                      </pre>
                    </div>
                  </div>

                  {/* Expected Output */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="test-case-expected-outputs">
                      Expected Output
                    </label>
                    <div
                      id="test-case-expected-outputs"
                      className="p-2 w-full bg-palatte-medium border-2 border-palatte-extraLight rounded-lg text-palatte-dark max-h-40 overflow-y-auto"
                    >
                      <pre>
                        {assessmentData?.[currentQuestionNumber - 1]
                          ?.testCases?.[CurrentTestCaseNumber - 1]
                          .expectedOutput || "expected outputs"}
                      </pre>
                    </div>
                  </div>

                  {/* Actual Output */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="test-case-actual-output">
                      Actual Output
                    </label>
                    <div
                      id="test-case-actual-output"
                      className="p-2 w-full bg-palatte-medium border-2 border-palatte-extraLight rounded-lg text-palatte-dark max-h-40 overflow-y-auto"
                    >
                      <pre>actual output</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessment;
