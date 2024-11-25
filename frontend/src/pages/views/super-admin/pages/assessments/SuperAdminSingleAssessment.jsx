import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Mock data for assessments
const assessments = [
    {
        id: "A001",
        title: "Mathematics Quiz",
        type: "MCQ",
        totalQuestions: 20,
        duration: "30 min",
        date: "2024-11-15",
        questionsAttempted: 15,
        passPercentage: 80,
    },
    {
        id: "A002",
        title: "Coding Challenge - Algorithm",
        type: "Coding",
        totalQuestions: 3,
        duration: "1 hour",
        date: "2024-11-18",
        questionsAttempted: 3,
        passPercentage: 90,
    },
    {
        id: "A003",
        title: "Science Quiz",
        type: "MCQ",
        totalQuestions: 15,
        duration: "25 min",
        date: "2024-11-20",
        questionsAttempted: 12,
        passPercentage: 75,
    },
];

const SuperAdminSingleAssessmentsInfo = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

    // Handle the navigation to assessment details page
    const handleAssessmentClick = (id) => {
        navigate(`/instructor/assessment/${id}`);
    };

    // Filter assessments based on category
    const filteredAssessments = assessments.filter((assessment) =>
        selectedCategory === "All" ? true : assessment.type === selectedCategory
    );

    return (
        <div className="flex flex-col gap-4 p-4 overflow-auto max-h-[85vh] stylish-scrollbar">
            {/* Header */}
            <div className="w-full flex justify-between items-center rounded-lg shadow-lg">
                <h1 className="text-md font-bold text-palatte-light">
                    Assessments
                </h1>
                <motion.button
                    initial="hidden"
                    animate="show"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.025 }}
                    onClick={() => navigate("/instructor")}
                    className="px-6 py-2 bg-palatte-primary4 hover:bg-palatte-primary3 text-palatte-extraLight rounded-lg font-bold"
                >
                    Back to Dashboard
                </motion.button>
            </div>
            <hr className="border border-palatte-secondary" />

            {/* Filter */}
            <div className="flex items-center gap-8 mt-4">
                <p className="text-palatte-medium text-lg font-semibold">Filter by Type:</p>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-palatte-light text-palatte-medium text-lg py-2 px-4 rounded-lg"
                >
                    <option value="All">All</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Coding">Coding</option>
                </select>
            </div>

            {/* InstructorAssessments List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredAssessments.map((assessment) => (
                    <motion.div
                        key={assessment.id}
                        className="w-full p-6 bg-palatte-secondary rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
                        onClick={() => handleAssessmentClick(assessment.id)}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="text-white text-2xl font-bold">{assessment.title}</div>
                        <div className="text-palatte-medium text-sm mt-2">
                            <span className="font-semibold">Type: </span>
                            {assessment.type}
                        </div>
                        <div className="text-palatte-medium text-sm mt-2">
                            <span className="font-semibold">Total Questions: </span>
                            {assessment.totalQuestions}
                        </div>
                        <div className="text-palatte-medium text-sm mt-2">
                            <span className="font-semibold">Duration: </span>
                            {assessment.duration}
                        </div>
                        <div className="text-palatte-medium text-sm mt-2">
                            <span className="font-semibold">Date: </span>
                            {assessment.date}
                        </div>
                        <div className="text-palatte-medium text-sm mt-4">
                            <span className="font-semibold">Questions Attempted: </span>
                            {assessment.questionsAttempted}/{assessment.totalQuestions}
                        </div>
                        <div className="text-palatte-medium text-sm mt-2">
                            <span className="font-semibold">Pass Percentage: </span>
                            {assessment.passPercentage}%
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SuperAdminSingleAssessmentsInfo;
