import React, { useState } from "react";
import { styles } from "../../../../../styles.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../../utils/motion.js";
import { CheckCircle, Clock, Search, XCircle } from "lucide-react";

// Placeholder data for InstructorAssessments
const InstructorAssessments = [
    {
        title: "Quiz 1",
        instructor: "John Doe",
        type: "MCQ",
        status: "Active",
        dueDate: "2024-11-30",
        submissions: 15,
        totalStudents: 20,
    },
    {
        title: "Coding Challenge 1",
        instructor: "Jane Smith",
        type: "Coding",
        status: "Ended",
        dueDate: "2024-11-20",
        submissions: 10,
        totalStudents: 10,
    },
    {
        title: "Quiz 1",
        instructor: "John Doe",
        type: "MCQ",
        status: "Active",
        dueDate: "2024-11-30",
        submissions: 15,
        totalStudents: 20,
    },
    {
        title: "Coding Challenge 1",
        instructor: "Jane Smith",
        type: "Coding",
        status: "Ended",
        dueDate: "2024-11-20",
        submissions: 10,
        totalStudents: 10,
    },
];

const InstructorAssessmentsInfo = () => {
    const [isLoading, setIsLoading] = useState(false); // Set to false for demo purposes
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("All Types");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter assessments based on the selected type, status, and search query
    const filteredAssessments = InstructorAssessments.filter((assessment) => {
        const matchesType =
            selectedType === "All Types" || assessment.type === selectedType;
        const matchesStatus =
            selectedStatus === "All Status" || assessment.status === selectedStatus;
        const matchesSearch =
            searchQuery === "" ||
            assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesStatus && matchesSearch;
    });

    const handleClick = async (e) => {
        e.preventDefault();
        navigate(`/instructor/assessments/add-new-assessment`);
    };

    return (
        <section className="w-full flex flex-col gap-4">
            {/* Header Section */}
            <div className="w-full h-[5rem] flex flex-col sm:flex-row justify-between items-center p-5 bg-palatte-primary1 rounded-lg">
                <h1 className={`font-bold text-lg sm:text-xl text-white`}>
                    Assessments
                </h1>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.025 }}
                    className={`sm:w-[4rem] md:w-[6rem] lg:w-[8rem] h-[3rem] text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg cursor-pointer`}
                    onClick={handleClick}
                >
                    + New
                </motion.button>
            </div>

            {/* Content Section */}
            <div className="w-full h-[40rem] sm:h-[35rem] md:h-[35rem] lg:h-[40rem] p-4 gap-4 rounded-lg bg-palatte-primary1 flex flex-col justify-start items-center">
                {isLoading ? (
                    <p className="text-center text-white">Loading...</p>
                ) : (
                    <>
                        {/* Filter and Search */}
                        <div className="p-4 bg-palatte-primary2 rounded-lg shadow-md w-full">
                            <div className="flex gap-4 items-center">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-palatte-primary3 hover:text-palatte-secondary hover:font-bold cursor-pointer w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search assessments..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2 bg-palatte-extraLight border rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 text-palatte-dark"
                                    />
                                </div>
                                <select
                                    className="w-1/4 px-4 py-2 bg-palatte-secondary text-palatte-extraLight border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 cursor-pointer"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option>All Types</option>
                                    <option>MCQ</option>
                                    <option>Coding</option>
                                </select>
                                <select
                                    className="w-1/4 px-4 py-2 bg-palatte-secondary text-palatte-extraLight border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 cursor-pointer"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Ended</option>
                                </select>
                            </div>
                        </div>

                        {/* Assessments List */}
                        <div className="overflow-y-auto max-h-[100%] stylish-scrollbar bg-palatte-primary2 p-4 flex flex-col gap-4 rounded-lg shadow-md w-full">
                            {filteredAssessments.length > 0 ? (
                                filteredAssessments.map((assessment, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-palatte-primary3 text-palatte-extraLight rounded-lg shadow hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">{assessment.title}</h3>
                                                <p className="text-sm text-palatte-medium">
                                                    Instructor: {assessment.instructor}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                    assessment.status === "Active"
                                                        ? "bg-green-500 bg-opacity-20 text-green-400"
                                                        : "bg-yellow-500 bg-opacity-20 text-yellow-400"
                                                }`}
                                            >
                        {assessment.status}
                      </span>
                                        </div>

                                        <div className="mt-4 flex gap-4 text-sm">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                                Due: {assessment.dueDate}
                                            </div>
                                            <div className="flex items-center">
                                                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                                {assessment.submissions} submissions
                                            </div>
                                            <div className="flex items-center">
                                                <XCircle className="w-4 h-4 text-red-400 mr-2" />
                                                {assessment.totalStudents - assessment.submissions} pending
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-palatte-medium h-2 rounded-full"
                                                    style={{
                                                        width: `${
                                                            (assessment.submissions / assessment.totalStudents) * 100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-palatte-medium mt-1">
                                                {Math.round(
                                                    (assessment.submissions / assessment.totalStudents) * 100
                                                )}
                                                % completion rate
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-palatte-error">
                                    No matching results found.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default InstructorAssessmentsInfo;
