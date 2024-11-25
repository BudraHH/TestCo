import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Placeholder data for StudentAssessments
const StudentAssessments = [
    {
        title: "Operating Systems Quiz",
        instructor: "Alice Johnson",
        type: "MCQ",
        status: "Active",
        dueDate: "2024-12-05",
        submissions: false,
        subject: "Operating Systems",
        id: 1,
    },
    {
        title: "DSA Problem Set 1",
        instructor: "Bob Smith",
        type: "Coding",
        status: "Active",
        dueDate: "2024-11-25",
        submissions: true,
        subject: "Data Structures",
        id: 2,
    },
    {
        title: "Database Management Assignment",
        instructor: "Carol Williams",
        type: "MCQ",
        status: "Ended",
        dueDate: "2024-11-20",
        submissions: false,
        subject: "Database Management",
        id: 3,
    },
    {
        title: "Computer Networks Lab",
        instructor: "David Brown",
        type: "Coding",
        status: "Active",
        dueDate: "2024-12-01",
        submissions: true,
        subject: "Computer Networks",
        id: 4,
    },
    {
        title: "Machine Learning Project",
        instructor: "Eve Davis",
        type: "Coding",
        status: "Active",
        dueDate: "2024-12-15",
        submissions: false,
        subject: "Machine Learning",
        id: 5,
    },
    {
        title: "OOPs Programming Task",
        instructor: "Frank Wilson",
        type: "Coding",
        status: "Ended",
        dueDate: "2024-11-18",
        submissions: true,
        subject: "Object-Oriented Programming",
        id: 6,
    },
];

const StudentAssessmentsInfo = ({ onAssessmentSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All Subjects");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedCompletion, setSelectedCompletion] = useState("All");

    const navigate = useNavigate();

    const handleViewDetails = (assessment) => {
        navigate(`/student/assessment/${assessment.id}`, {
            state: { assessment },
        });
    };

    const handleStartTest = (assessment) => {
        navigate(`/student/start-test/${assessment.id}`, {
            state: { assessment },
        });
    };

    const sortedAssessments = [...StudentAssessments].sort((a, b) => b.id - a.id);

    const filteredAssessments = sortedAssessments.filter((assessment) => {
        const matchesType =
            selectedType === "" || assessment.type === selectedType;
        const matchesSubject =
            selectedSubject === "All Subjects" ||
            assessment.subject === selectedSubject;
        const matchesStatus =
            selectedStatus === "All Status" || assessment.status === selectedStatus;
        const matchesCompletion =
            selectedCompletion === "All" ||
            (selectedCompletion === "Completed" && assessment.submissions) ||
            (selectedCompletion === "Not Completed" && !assessment.submissions);
        const matchesSearch =
            searchQuery === "" ||
            assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assessment.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesSubject && matchesStatus && matchesCompletion && matchesSearch;
    });

    return (
        <section className="w-full flex flex-col gap-4">
            {/* Header */}
            <div className="w-full flex justify-between items-center bg-palatte-primary1 text-palatte-extraLight p-4 rounded-lg shadow">
                <h1 className="text-xl font-bold">My Assessments</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/student/home")}
                    className="px-4 py-2 bg-palatte-primary4 text-palatte-extraLight rounded-lg shadow hover:bg-palatte-secondary"
                >
                    Back
                </motion.button>
            </div>
            {/* Filters */}
            <div className="w-full flex gap-4 justify-between items-center bg-palatte-primary2 p-4 rounded-lg shadow">
                <div className="relative w-[20rem]">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-palatte-medium hover:text-palatte-secondary cursor-pointer" />
                    <input
                        type="text"
                        placeholder="Search assessments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-2 bg-palatte-extraLight text-palatte-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4"
                    />
                </div>
                <div className={`flex gap-5`}>
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Assessment Type</option>
                        <option value="MCQ">MCQ</option>
                        <option value="Coding">Coding</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                        <option value="All Subjects">All Subjects</option>
                        <option value="Operating Systems">Operating Systems</option>
                        <option value="Data Structures">Data Structures</option>
                        <option value="Database Management">Database Management</option>
                        <option value="Computer Networks">Computer Networks</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Object-Oriented Programming">Object-Oriented Programming</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Ended">Ended</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none"
                        value={selectedCompletion}
                        onChange={(e) => setSelectedCompletion(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Not Completed">Not Completed</option>
                    </select>
                </div>
            </div>

            {/* Assessments List */}
            <div className={`max-h-[35rem] overflow-auto stylish-scrollbar rounded-lg pr-2`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAssessments.length > 0 ? (
                        filteredAssessments.map((assessment) => (
                            <motion.div
                                key={assessment.id}
                                className="p-4 bg-palatte-primary2 shadow-lg rounded-lg will-change-transform isolation-isolate transition-transform hover:scale-105"
                                whileHover={{ scale: 1.0025 }}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-bold text-palatte-extraLight">
                                            {assessment.title}
                                        </h3>
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
                                <div className="mt-4 flex items-center text-sm text-palatte-medium">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Due: {assessment.dueDate}
                                </div>
                                <div className="mt-4 text-sm text-palatte-medium">
                                    Completion Status:{" "}
                                    <span
                                        className={`font-semibold ${
                                            assessment.submissions ? "text-green-400" : "text-red-400"
                                        }`}
                                    >
                                        {assessment.submissions ? "Completed" : "Not Completed"}
                                    </span>
                                </div>
                                <motion.button
                                    onClick={() =>
                                        assessment.status === "Active" && !assessment.submissions
                                            ? handleStartTest(assessment)
                                            : handleViewDetails(assessment)
                                    }
                                    className="mt-4 w-full px-4 py-2 text-palatte-extraLight bg-palatte-primary4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {assessment.status === "Active" && !assessment.submissions
                                        ? "Start Test"
                                        : "View Details"}
                                </motion.button>
                            </motion.div>
                        ))
                    ) : (
                        <div className="w-full text-center text-palatte-medium">
                            No assessments found matching the filters.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StudentAssessmentsInfo;
