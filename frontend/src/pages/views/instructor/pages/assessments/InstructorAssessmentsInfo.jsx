import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Search, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const InstructorAssessments = [
    {
        title: "Operating Systems Quiz",
        type: "MCQ",
        status: "Active",
        dueDate: "2024-12-05",
        submissions: 15,
        totalStudents: 20,
        id: 1,
        course: "Operating Systems",
    },
    {
        title: "Data Structures Problem Set",
        type: "Coding",
        status: "Ended",
        dueDate: "2024-11-25",
        submissions: 10,
        totalStudents: 10,
        id: 2,
        course: "Data Structures",
    },
    {
        title: "Database Management Assignment",
        type: "MCQ",
        status: "Ended",
        dueDate: "2024-11-20",
        submissions: 8,
        totalStudents: 10,
        id: 3,
        course: "Database Management",
    },
    {
        title: "Computer Networks Lab",
        type: "Coding",
        status: "Active",
        dueDate: "2024-12-01",
        submissions: 5,
        totalStudents: 20,
        id: 4,
        course: "Computer Networks",
    },
    {
        title: "Machine Learning Project",
        type: "Coding",
        status: "Active",
        dueDate: "2024-12-15",
        submissions: 12,
        totalStudents: 15,
        id: 5,
        course: "Machine Learning",
    },
];

const InstructorAssessmentsInfo = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [coursesHandled, setCoursesHandled] = useState([]);
    const navigate = useNavigate();

    const {
        courses = [], // Fallback to empty array if no courses
    } = useOutletContext();

    useEffect(() => {
        setCoursesHandled(courses);
    }, [courses]);

    const handleViewSubmissions = (assessment) => {
        navigate(`/instructor/assessment/${assessment.id}/submissions`, {
            state: { assessment },
        });
    };

    const sortedAssessments = [...InstructorAssessments].sort((a, b) => b.id - a.id);

    const filteredAssessments = sortedAssessments.filter((assessment) => {
        const matchesType = selectedType === "" || assessment.type === selectedType;
        const matchesStatus =
            selectedStatus === "All Status" || assessment.status === selectedStatus;
        const matchesCourse =
            selectedCourse === "" || assessment.course === selectedCourse;
        const matchesSearch =
            searchQuery === "" ||
            assessment.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesStatus && matchesCourse && matchesSearch;
    });

    return (
        <section className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center bg-palatte-primary1 text-palatte-extraLight p-4 rounded-lg shadow">
                <h1 className="text-lg font-bold">Assessments</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/instructor/assessments/add-new-assessment")}
                    className="px-4 py-2 bg-palatte-primary4 text-palatte-extraLight rounded-lg shadow hover:bg-palatte-secondary"
                >
                    + New Assessment
                </motion.button>
            </div>

            <div className="w-full flex gap-4 justify-between items-center rounded-lg shadow">
                <div className="relative w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palatte-medium w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search assessments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-white bg-palatte-primary3 border border-palatte-secondary rounded-lg focus:outline-none focus:bg-palatte-secondary"
                    />
                </div>


                <div className="flex gap-5">
                    {selectedType && (
                        <select
                            className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                        >
                            <option value="">-- Courses --</option>
                            {coursesHandled.map((course) => (
                                <option key={course} value={course}>
                                    {course}
                                </option>
                            ))}
                        </select>
                    )}
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">-- Assessment Type --</option>
                        <option value="MCQ">MCQ</option>
                        <option value="Coding">Coding</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-palatte-primary3 text-palatte-extraLight rounded-lg focus:outline-none cursor-pointer"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="All Status">-- All Status --</option>
                        <option value="Active">Active</option>
                        <option value="Ended">Ended</option>
                    </select>
                </div>
            </div>

            <div className="max-h-[35rem] overflow-auto stylish-scrollbar rounded-lg pr-2">
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
                                            Type: {assessment.type}
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
                                <div className="mt-4 flex flex-col gap-2">
                                    <div className="flex items-center text-sm text-palatte-medium">
                                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                                        {assessment.submissions} submissions
                                    </div>
                                    <div className="flex items-center text-sm text-palatte-medium">
                                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                                        {assessment.totalStudents - assessment.submissions} pending
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-palatte-medium h-2 rounded-full"
                                            style={{
                                                width: `${
                                                    (assessment.submissions /
                                                        assessment.totalStudents) *
                                                    100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-palatte-medium">
                                        {Math.round(
                                            (assessment.submissions / assessment.totalStudents) *
                                            100
                                        )}
                                        % completion rate
                                    </p>
                                </div>
                                <motion.button
                                    onClick={() => handleViewSubmissions(assessment)}
                                    className="mt-4 w-full px-4 py-2 text-palatte-extraLight bg-palatte-primary4 rounded-lg"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    View Submissions
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

export default InstructorAssessmentsInfo;
