import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import * as XLSX from "xlsx";
import { FilePlus, UserPlus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import backendApi from "../../../../../backendAPI/index.js";
import { useSelector } from "react-redux";

const InstructorAddNewStudent = () => {
    const { accessToken: tokenFromRedux } = useSelector((state) => state.user.user);
    const [fileData, setFileData] = useState([]);
    const [studentsData, setStudentsData] = useState([{ email: "", courses: [] }]);
    const [numStudents, setNumStudents] = useState();
    const [isUploadFileActive, setIsUploadFileActive] = useState(true);
    const [courseInput, setCourseInput] = useState(""); // For courses input
    const navigate = useNavigate();
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

    useEffect(() => {
        setCoursesHandled(courses);
    }, [courses]);

    const handleBackClick = () => navigate(`/instructor/students-details`);
    const handleCourseSelect = (e) => {
        setSelectedCourse(e.target.value);
    };
    console.log(selectedCourse);

    // Handle file upload and parse it
    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Assume courses are in a separate column in the file (adjust based on your actual file)
            const updatedData = jsonData.map((student) => ({
                email: student.email,
                enrolledCourse: selectedCourse,
            }));
            setFileData(updatedData);
        };
        reader.readAsArrayBuffer(file);
    };

    // Dropzone hook
    const { getRootProps, getInputProps } = useDropzone({
        accept: ".xlsx, .xls",
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            handleFileUpload(file);
        },
    });

    // Handle student number input change
    const handleNumStudentsChange = (e) => {
        const value = parseInt(e.target.value);
        setNumStudents(value);
        const newStudentsData = Array.from({ length: value }, (_, i) => ({
            email: studentsData[i]?.email || "",
            courses: studentsData[i]?.courses || [],
        }));
        setStudentsData(newStudentsData);
    };

    // Handle changes to student email fields
    const handleStudentChange = (index, field, value) => {
        setStudentsData((prev) =>
            prev.map((student, i) =>
                i === index ? { ...student, [field]: value } : student
            )
        );
    };

    // Handle course input field
    const handleCourseChange = (index, course) => {
        setStudentsData((prev) =>
            prev.map((student, i) =>
                i === index
                    ? { ...student, courses: [...student.courses, course] }
                    : student
            )
        );
        setCourseInput(""); // Clear the input after adding the course
    };

    // Handle form submission
    const sendDataToBackend = async (data) => {
        try {
            const response = await fetch(backendApi.addStudents.url, {
                method: backendApi.addStudents.method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenFromRedux}`,
                },
                body: JSON.stringify({
                    students: data,
                }),
            });

            if (response.ok) {
                alert("Data submitted successfully!");
                // Reset all relevant state variables
                setFileData([]);
                setStudentsData([{ email: "", courses: [] }]);
                setNumStudents(1);
                setCourseInput("");
                setIsUploadFileActive(false);
                setSelectedCourse("")
            } else {
                alert("Failed to submit data.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data.");
        }
    };

    // Final submission: decides what data to send based on the state
    const handleSubmit = () => {
        const dataToSend = fileData.length > 0 ? fileData : studentsData;
        if (dataToSend.length > 0) {
            console.log(dataToSend);
            sendDataToBackend(dataToSend);  // Uncommented this line to send data
        } else {
            alert("No data to submit.");
        }
    };

    return (
        <section className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center bg-palatte-primary2 p-4 rounded-lg shadow-lg">
                <h1 className="text-md font-regular text-white">
                    <span className="cursor-pointer" onClick={handleBackClick}>
                        My Students
                    </span>{" "}
                    / <span className="font-bold">Add New Student</span>
                </h1>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.025 }}
                    className="sm:w-[6rem] h-[2.5rem] text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg"
                    onClick={handleBackClick}
                >
                    Back
                </motion.button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-dark rounded-lg">
                <div
                    className="h-[9rem] flex flex-col gap-4 items-center justify-start rounded-lg p-4 shadow-sm w-full md:w-[250px] bg-palatte-primary1">
                    <motion.button
                        whileTap={{scale: 0.95}}
                        whileHover={{scale: 1.025}}
                        className={`w-full flex items-center gap-2 px-6 py-3 rounded-lg transition duration-300 ease-in-out ${
                            isUploadFileActive
                                ? "text-white ring-2 ring-palatte-secondary bg-palatte-dark shadow-md"
                                : "text-palatte-medium bg-palatte-primary3 hover:bg-palatte-primary3 hover:text-palatte-light"
                        }`}
                        onClick={() => setIsUploadFileActive(true)}
                    >
                        <FilePlus className="h-5 w-5"/>
                        Upload File
                    </motion.button>
                    <motion.button
                        whileTap={{scale: 0.95}}
                        whileHover={{scale: 1.025}}
                        className={`w-full flex items-center gap-2 px-6 py-3 rounded-lg transition duration-300 ease-in-out ${
                            !isUploadFileActive
                                ? "text-white ring-2 ring-palatte-secondary bg-palatte-dark shadow-md"
                                : "text-palatte-medium bg-palatte-primary3 hover:bg-palatte-primary3 hover:text-palatte-light"
                        }`}
                        onClick={() => setIsUploadFileActive(false)}
                    >
                        <UserPlus className="h-5 w-5"/>
                        Manually
                    </motion.button>

                </div>

                <div className="flex flex-col w-full rounded-lg bg-palatte-primary1 p-4 shadow-lg">
                    {isUploadFileActive ? (
                        <div className="space-y-4 w-full">
                            <div className={`flex flex-row justify-between`}>
                                <label className="block text-palatte-light font-medium mb-2">
                                    Upload Excel File
                                </label>
                                <select
                                    value={selectedCourse}
                                    onChange={handleCourseSelect}
                                    className="cursor-pointer bg-palatte-primary3 text-palatte-light px-4 py-2 rounded-lg border border-palatte-secondary"
                                >
                                    <option value="">-- Select course --</option>
                                    {coursesHandled.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course} {/* Ensure course has a `name` property */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                {...getRootProps()}
                                className="flex items-center justify-center w-full h-40 border-2 border-dashed border-palatte-secondary rounded-lg bg-palatte-primary2 text-palatte-light cursor-pointer hover:bg-palatte-primary4 transition duration-300 ease-in-out"
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center">
                                    <FilePlus className="h-8 w-8 mb-2"/>
                                    <span className="text-center text-sm">
                                        Drag & Drop Excel File Here
                                    </span>
                                </div>
                            </div>

                            {fileData.length > 0 && (
                                <div>
                                    <p className="text-sm text-palatte-light mt-2">
                                        {fileData.length} records found.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-row justify-between gap-5">

                                    <input
                                        type="number"
                                        value={numStudents}
                                        placeholder={'Enter number of students'}
                                        min={1}
                                        max={100}
                                        onChange={handleNumStudentsChange}
                                        className="w-full p-2 rounded-lg border border-palatte-secondary bg-palatte-primary3 text-palatte-light focus:outline-none focus:ring-1 focus:ring-palatte-secondary"
                                    />

                                <select
                                    value={selectedCourse}
                                    onChange={handleCourseSelect}
                                    className="cursor-pointer bg-palatte-primary3 text-palatte-light px-4 py-2 rounded-lg border border-palatte-secondary"
                                >
                                    <option value="">-- Select course --</option>
                                    {coursesHandled.map((course) => (
                                        <option key={course._id} value={course._id}>
                                            {course} {/* Ensure course has a `name` property */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {studentsData.map((student, index) => (
                                <div
                                    key={index}
                                    className="space-y-2 border-b-2 pb-4"
                                >
                                    <label className="block text-palatte-light font-medium">
                                        Student {index + 1} Email
                                    </label>
                                    <input
                                        type="email"
                                        value={student.email}
                                        onChange={(e) =>
                                            handleStudentChange(
                                                index,
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-2 rounded-lg border border-palatte-secondary bg-palatte-primary3 text-palatte-light focus:outline-none focus:ring-1 focus:ring-palatte-secondary"
                                    />


                                </div>
                            ))}
                        </div>

                    )}
                    <motion.button
                        whileTap={{scale: 0.95}}
                        className="w-full h-[3rem] mt-5 text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg shadow-md"
                        onClick={handleSubmit}
                    >
                        Submit
                    </motion.button>
                </div>
            </div>


        </section>
    );
};

export default InstructorAddNewStudent;
