import { useEffect, useState, useCallback } from "react";
import backendApi from "../../../../../../../backendAPI/index.js";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../../../../utils/motion.js";

const MCQAssessment = () => {
  const [assessmentData, setAssessmentData] = useState([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMCQAssessmentData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(backendApi.mcqAssessmentDataPull.url, {
        method: backendApi.mcqAssessmentDataPull.method,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const questions = data?.data[0]?.mcqQuestions || [];
      if (questions.length === 0) {
        console.warn("No MCQ questions found.");
      }

      setAssessmentData(questions);
      setSelectedOptions(new Array(questions.length).fill(null));
    } catch (e) {
      console.error("Error fetching MCQ assessment data:", e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMCQAssessmentData();
  }, [fetchMCQAssessmentData]);

  const handleOptionSelect = (questionIndex, optionIndex) => {
    setSelectedOptions((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[questionIndex] = optionIndex;
      return updatedOptions;
    });
  };

  const submitAnswers = async () => {
    if (selectedOptions.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(backendApi.mcqAssessmentEvaluation.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: selectedOptions,
          assessmentId: assessmentData[0]?.id || "default-id",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting answers:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };



    return (
        <div className="flex flex-row gap-2 p-4 h-screen w-screen bg-palatte-dark">
          {/* Left Sidebar */}
          <div className="w-[3rem] rounded-lg p-1 bg-white shadow-md flex flex-col gap-1 overflow-auto scrollbar-hide">
            {assessmentData.length > 0 ? (
                assessmentData.map((_, index) => (
                    <motion.button
                        variants={fadeIn("center", "", 0.25, 0.25)}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.95 }}
                        initial="hidden"
                        animate="show"
                        key={index}
                        className={`w-full flex justify-center items-center rounded-lg cursor-pointer ${
                            currentQuestionNumber - 1 === index
                                ? "bg-palatte-secondary text-white"
                                : "bg-palatte-dark text-palatte-medium hover:bg-secondary-light hover:text-white"
                        }`}
                        style={{
                          height: `20vh`,
                          aspectRatio: "1",
                        }}
                        onClick={() => setCurrentQuestionNumber(index + 1)}
                    >
                      <p>{index + 1}</p>
                    </motion.button>
                ))
            ) : (
                <p className="w-full h-full flex justify-center items-center text-gray-700 bg-primary-DEFAULT rounded-lg">
                  nil
                </p>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col justify-center items-center gap-2 w-full h-full rounded-lg shadow-md overflow-hidden">
            {assessmentData.length > 0 ? (
                <>
                  <div className="flex flex-row justify-center items-center gap-2 w-full h-full ">
                    {/* Question Section */}


                    <div
                        className="resize h-full flex flex-col gap-2 p-4 bg-palatte-extraLight rounded-lg border border-gray-200 hover:border-secondary-light"
                        style={{
                          resize: "horizontal",
                          minWidth: "35%",
                          maxWidth: "75%",
                          width: "50%",
                        }}
                    >
                      <div className="h-full flex flex-col justify-start gap-5">
                        <div className="border-b border-gray-800">
                          <h2 className="text-start text-xl mb-2 text-gray-800">
                            Question {currentQuestionNumber}
                          </h2>
                        </div>
                        <div className="overflow-auto scrollbar-hide max-h-[40rem] flex flex-col gap-5">
                          <div className="border-b border-gray-200 w-full py-5">
                            <p className="text-md leading-relaxed break-words whitespace-normal max-w-full text-gray-700">
                              {assessmentData[currentQuestionNumber - 1]?.question ||
                                  "Question not available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Options Section */}
                    <div
                        className="flex flex-col h-full min-w-[25%] gap-6 p-4 bg-palatte-extraLight rounded-lg border border-gray-200 hover:border-secondary-light shadow-lg"
                        style={{
                          minWidth: "35%",
                          maxWidth: "75%",
                          width: "50%",
                          flexGrow: 2,
                        }}
                    >
                      <div className="h-full flex flex-col justify-start gap-5">
                        <h3 className="text-xl text-gray-800 border-b border-gray-800 pb-2">
                          Options
                        </h3>

                        <div className="overflow-auto scrollbar-hide max-h-[35rem]">
                          <ul className="flex flex-col gap-4">
                            {assessmentData[currentQuestionNumber - 1]?.options?.map(
                                (option, index) => (
                                    <li key={index} className="w-full">
                                      <motion.label
                                          whileTap={{ scale: 0.95 }}
                                          initial="hidden"
                                          animate="show"
                                          className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-sm ${
                                              selectedOptions[currentQuestionNumber - 1] ===
                                              index
                                                  ? "bg-palatte-secondary text-white"
                                                  : "bg-palatte-light hover:bg-palatte-medium hover:text-white"
                                          }`}
                                      >
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestionNumber}`}
                                            value={index}
                                            checked={
                                                selectedOptions[currentQuestionNumber - 1] ===
                                                index
                                            }
                                            onChange={() =>
                                                handleOptionSelect(
                                                    currentQuestionNumber - 1,
                                                    index
                                                )
                                            }
                                            className="form-radio h-4 w-4 text-secondary-DEFAULT"
                                        />
                                        <span className="text-md leading-relaxed break-words whitespace-normal max-w-[90%] text-lg p-2">
                                {option.option}
                              </span>
                                      </motion.label>
                                    </li>
                                )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation Bar */}
                  <div className="bg-white border border-gray-200 h-[4rem] w-full rounded-lg flex items-center justify-between gap-4 p-2 shadow-md">
                    <div className="bg-primary-light w-[10rem] h-[3rem] rounded-lg flex justify-center items-center text-gray-700">
                      timer
                    </div>
                    <div className="flex flex-row gap-2">
                      {currentQuestionNumber > 1 && (
                          <motion.button
                              whileHover={{ scale: 1.005 }}
                              whileTap={{ scale: 0.95 }}
                              initial="hidden"
                              animate="show"
                              onClick={() =>
                                  setCurrentQuestionNumber((prev) => Math.max(prev - 1, 1))
                              }
                              className="w-[6rem] bg-palatte-secondary text-white py-2 rounded-md font-medium transition-transform duration-300 transform hover:bg-palatte-medium focus:outline-none focus:ring-2 focus:ring-secondary-light shadow-lg"
                          >
                            Previous
                          </motion.button>
                      )}

                      {currentQuestionNumber === assessmentData.length ? (
                          <motion.button
                              variants={fadeIn("center", "", 0.25, 0.25)}
                              whileHover={{ scale: 1.005 }}
                              whileTap={{ scale: 0.95 }}
                              initial="hidden"
                              animate="show"
                              className="w-[6rem] bg-green-500 text-white py-2 rounded-md font-medium transition-transform duration-300 transform hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg"
                              onClick={submitAnswers}
                              disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Finish"}
                          </motion.button>
                      ) : (
                          <motion.button
                              whileHover={{ scale: 1.005 }}
                              whileTap={{ scale: 0.95 }}
                              initial="hidden"
                              animate="show"
                              className="w-[6rem] bg-palatte-secondary text-white px-6 py-2 rounded-md font-medium transition-transform duration-300 transform hover:bg-palatte-medium focus:outline-none focus:ring-2 focus:ring-secondary-light shadow-lg"
                              onClick={() =>
                                  setCurrentQuestionNumber((prev) =>
                                      Math.min(prev + 1, assessmentData.length)
                                  )
                              }
                          >
                            Next
                          </motion.button>
                      )}
                    </div>
                  </div>
                </>
            ) : (
                <p className="text-gray-700">No questions available for this assessment.</p>
            )}
          </div>
        </div>
    );
  };

  export default MCQAssessment;




