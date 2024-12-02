import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import backendAPI from "../../../../../backendAPI/index.js";

const InstructorStudentsDetails = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [studentsList, setStudentsList] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [coursesHandled, setCoursesHandled] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");

    const {
        userDetails,
        courses = [], // Fallback to empty array if no courses
        loading,
        error,
        setLoading,
        setError,
    } = useOutletContext();

    // Fetch students for the selected course
    const fetchStudentsData = async () => {
        if (!selectedCourse) {
            setStudentsList([]);
            setFilteredStudents([]);
            return; // Skip fetch if no course is selected
        }

        try {
            setLoading(true);
            setError(null);

            if (!backendAPI.students || !userDetails?.token) {
                throw new Error("Invalid API configuration or missing user token.");
            }

            const response = await fetch(`${backendAPI.students.url}?course=${selectedCourse}`, {
                method: backendAPI.students.method || "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userDetails?.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch students. Status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.success || !data.students) {
                throw new Error("Invalid student data received.");
            }

            setStudentsList(data.students);
            setFilteredStudents(data.students);
        } catch (err) {
            console.error("Error fetching students:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle search input
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = studentsList.filter(
            (student) =>
                student._id.toLowerCase().includes(query) ||
                student.student_name.toLowerCase().includes(query) ||
                student.email.toLowerCase().includes(query)
        );

        setFilteredStudents(filtered);
    };

    // Handle course selection
    const handleCourseSelect = (e) => {
        setSelectedCourse(e.target.value);
    };

    // Navigate to student details
    const handleRowClick = (student) => {
        const queryString = new URLSearchParams({
            id: student._id,
            name: student.student_name,
            email: student.email,
        }).toString();

        navigate(`/instructor/students-details/student?${queryString}`);
    };

    // Navigate to add a new student
    const handleClick = () => {
        navigate(`/instructor/students-details/add-new-student`);
    };

    useEffect(() => {
        setCoursesHandled(courses);
    }, [courses]);

    useEffect(() => {
        fetchStudentsData();
    }, [selectedCourse]);

    return (
        <section className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center bg-palatte-primary1 text-palatte-extraLight p-4 rounded-lg shadow">
                <h1 className="text-md font-bold">My Students</h1>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.025 }}
                    className="px-4 py-2 bg-palatte-primary4 text-palatte-extraLight rounded-lg shadow hover:bg-palatte-secondary"
                    onClick={handleClick}
                >
                    + New
                </motion.button>
            </div>

            <div
                className="flex flex-row justify-between ">
                <div className="relative w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palatte-medium w-5 h-5"/>
                    <input
                        type="text"
                        placeholder="Search students by ID, name, or email..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-10 pr-4 py-2 text-white bg-palatte-primary3 border border-palatte-secondary rounded-lg focus:outline-none focus:bg-palatte-secondary"
                    />
                </div>
                <div>
                    <select
                        value={selectedCourse}
                        onChange={handleCourseSelect}
                        className="cursor-pointer bg-palatte-primary3 text-palatte-light px-4 py-2 rounded-lg border border-palatte-secondary"
                    >
                        <option value="">-- Select course --</option>
                        {coursesHandled.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="max-h-[35rem] w-full bg-palatte-white rounded-lg  overflow-y-auto stylish-scrollbar ">
                {loading ? (
                    <p className=" h-[10rem] w-full flex justify-center items-center text-sm bg-palatte-primary1 rounded-lgtext-center italic text-palatte-medium">Loading...</p>
                ) : error ? (
                    <p className="h-[10rem] w-full flex justify-center items-center text-sm bg-palatte-primary1 rounded-lg text-center italic text-palatte-medium">{error}</p>
                ) : filteredStudents.length === 0 ? (
                    <p className="h-[10rem] w-full flex justify-center items-center text-sm bg-palatte-primary1 rounded-lg text-center italic text-palatte-medium">
                        No matching student details found.
                    </p>
                ) : (
                    <table className="min-w-full text-sm text-gray-300 bg-palatte-primary1 rounded-lg mr-2">
                        <thead className="sticky top-0 bg-palatte-primary3 z-10 rounded-lg">
                        <tr className="h-16 text-palatte-extraLight rounded-lg">
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Serial No.
                            </th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Student ID
                            </th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Email
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-palatte-secondary">
                        {filteredStudents.map((student, index) => (
                            <tr
                                key={student._id}
                                className="hover:bg-palatte-primary3 transition-all duration-150 ease-in-out cursor-pointer"
                                onClick={() => handleRowClick(student)}
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{student._id}</td>
                                <td className="px-6 py-4">{student.student_name || "N/A"}</td>
                                <td className="px-6 py-4">{student.email || "N/A"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
};

export default InstructorStudentsDetails;
