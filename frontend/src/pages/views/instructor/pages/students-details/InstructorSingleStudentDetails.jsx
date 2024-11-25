import  { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Line,  Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const InstructorSingleStudentDetails = () => {
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [dateRange, setDateRange] = useState([null, null]);
    const [studentDetails, setStudentDetails] = useState({
        id: "12345",
        name: "John Doe",
        email: "johndoe@example.com",
        testsAttempted: 5,
        averageScore: 78,
        lastLogin: "2024-11-20 10:30 AM",
        recentTests: [
            { id: "T001", name: "Math Test", score: 85, category: "Mathematics", date: "2024-11-10" },
            { id: "T002", name: "Science Test", score: 72, category: "Science", date: "2024-11-12" },
            { id: "T003", name: "English Test", score: 90, category: "Languages", date: "2024-11-15" },
            { id: "T004", name: "History Test", score: 65, category: "History", date: "2024-11-18" },
            { id: "T005", name: "Physics Test", score: 78, category: "Science", date: "2024-11-20" },
        ],
    });

    const navigate = useNavigate();

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    // Handle navigation back to the students list
    const handleBackClick = () => {
        navigate("/instructor/students-details");
    };

    // Filter Data Based on Selection
    const filteredTests = studentDetails.recentTests.filter((test) => {
        const testDate = new Date(test.date);
        const [startDate, endDate] = dateRange;

        const isDateInRange =
            (!startDate || testDate >= startDate) && (!endDate || testDate <= endDate);
        const isCategoryMatch = selectedCategory === "All" || test.category === selectedCategory;

        return isDateInRange && isCategoryMatch;
    });

    // Chart Data Preparation
    const testNames = filteredTests.map((test) => test.name);
    const testScores = filteredTests.map((test) => test.score);
    const categoryPerformance = filteredTests.reduce((acc, test) => {
        acc[test.category] = (acc[test.category] || 0) + test.score;
        return acc;
    }, {});

    const lineChartData = {
        labels: testNames,
        datasets: [
            {
                label: "Test Scores",
                data: testScores,
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const pieChartData = {
        labels: Object.keys(categoryPerformance),
        datasets: [
            {
                label: "Category Performance",
                data: Object.values(categoryPerformance),
                backgroundColor: ["#f44336", "#2196f3", "#ff9800", "#4caf50", "#9c27b0"],
            },
        ],
    };

    const barChartData = {
        labels: testNames,
        datasets: [
            {
                label: "Scores",
                data: testScores,
                backgroundColor: "#03a9f4",
            },
        ],
    };

    if (!id || !name) {
        return (
            <div className="flex justify-center items-center h-full text-palatte-medium">
                No student details found.
            </div>
        );
    }

    // Open the modal and set the image
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-4 p-4 max-h-[85vh] ">
            {/* Header */}
            <div
                className="w-full h-[5rem] flex flex-col sm:flex-row justify-between items-center p-5 bg-palatte-primary1 rounded-lg">
                <h1 className={`font-bold text-lg sm:text-xl text-white`}>
                    <span onClick={handleBackClick} className={`cursor-pointer`}>My Students</span> /{" "}
                    <span className="font-normal text-white">{studentDetails.name}</span>
                </h1>
                <motion.button
                    whileTap={{scale: 0.95}}
                    whileHover={{scale: 1.025}}
                    className={`sm:w-[4rem] md:w-[6rem] lg:w-[8rem] h-[3rem] text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg cursor-pointer`}
                    onClick={handleBackClick}
                >
                    Back
                </motion.button>
            </div>
            <hr className={`border border-palatte-secondary`}/>

            <div className={`overflow-auto  stylish-scrollbar`}>
                {/* STUDENT INFO */}
                <div className="flex flex-col gap-4 ">
                    <p className="text-md font-normal text-white">Student Information</p>
                    <hr className="border border-palatte-medium opacity-30"/>

                    <div className="w-full flex flex-col md:flex-row gap-4 p-4 bg-palatte-secondary rounded-lg shadow-lg">
                        {/* Left Column: Student Profile Info */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="flex items-center space-x-8">
                                <img
                                    className="h-24 w-24 rounded-full border-4 border-palatte-primary4 transform hover:scale-105 transition-all duration-300 ease-in-out"
                                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Student Avatar"
                                />
                                <div>
                                    <div className="text-white text-3xl font-bold">Michael Brown</div>
                                    <div className="text-palatte-medium text-lg">michael@example.com</div>
                                </div>
                            </div>

                            <div className="flex gap-8">
                                <div className="flex-1">
                                    <p className="text-palatte-medium text-sm">Role</p>
                                    <div
                                        className="px-6 py-3 inline-flex rounded-full bg-palatte-primary4 text-palatte-extraLight text-sm font-semibold">
                                        Student
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-palatte-medium text-sm">Status</p>
                                    <div
                                        className={`px-6 py-3 inline-flex rounded-full ${
                                            "Active" === "Active"
                                                ? "bg-green-500 bg-opacity-20 text-green-400"
                                                : "bg-red-500 bg-opacity-20 text-red-400"
                                        } text-sm font-semibold`}
                                    >
                                        Active
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-palatte-medium text-sm">Last Active</p>
                                <div className="text-white text-xl font-semibold">1 day ago</div>
                            </div>
                        </div>

                        {/* Right Column: Additional Information */}
                        <div className="flex-1 flex flex-col gap-8">
                            <div>
                                <p className="text-palatte-medium text-sm">Enrolled Courses</p>
                                <div className="text-white text-xl font-medium">Course 1, Course 2, Course 3</div>
                            </div>

                            <div>
                                <p className="text-palatte-medium text-sm">Assignments Submitted</p>
                                <div className="text-white text-xl font-medium">5 assignments completed</div>
                            </div>

                            <div>
                                <p className="text-palatte-medium text-sm">Upcoming Exams</p>
                                <div className="text-white text-xl font-medium">Math Exam, History Exam</div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className={`border border-palatte-secondary`}/>
                {/* PERFORMANCE ANALYTICS */}
                <div className={`flex flex-col gap-4 `}>
                    <p className="font-normal text-white">Analytics</p>
                    <hr className="border border-palatte-medium opacity-30"/>
                    {/* Filters */}
                    <div
                        className="w-full flex flex-col md:flex-row gap-4 p-4 bg-palatte-secondary rounded-lg shadow-xl">
                        {/* Category Section */}
                        <div className="flex flex-col w-full md:flex-1">
                            <label className="text-white font-semibold text-lg mb-2">Category</label>
                            <select
                                className="cursor-pointer p-3 bg-white text-gray-800 rounded-md border-2 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-200"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Science">Science</option>
                                <option value="Languages">Languages</option>
                                <option value="History">History</option>
                            </select>
                        </div>

                        {/* Date Range Section */}
                        <div className="flex flex-col w-full md:flex-1 ">
                            <label className="text-white font-semibold text-lg mb-2">Date Range</label>
                            <DatePicker
                                className="p-3 w-[100rem] bg-white text-gray-800 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all ease-in-out duration-200 sm:w-auto"
                                selectsRange
                                startDate={dateRange[0]}
                                endDate={dateRange[1]}
                                onChange={(update) => setDateRange(update)}
                                isClearable
                                placeholderText="Select Date Range"
                                dateFormat="MMMM d, yyyy"
                                showPopperArrow={false} // Hide the arrow for a cleaner look
                            />
                        </div>
                    </div>


                    {/* Student Details */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-palatte-secondary rounded-lg shadow-md">
                            <h2 className="text-palatte-light font-bold mb-4">Performance Over Time</h2>
                            <Line data={lineChartData}/>
                        </div>

                        <div className="p-5 bg-palatte-secondary rounded-lg shadow-md">
                            <h2 className="text-palatte-light font-bold mb-4">Scores by Test</h2>
                            <Bar data={barChartData}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InstructorSingleStudentDetails;
