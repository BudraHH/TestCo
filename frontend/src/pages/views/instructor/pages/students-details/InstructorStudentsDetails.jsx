import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const studentsList = [
    {
        _id: "S12345",
        student_name: "John Doe",
    },{
        _id: "S12345",
        student_name: "John Doe",
    },{
        _id: "S12345",
        student_name: "John Doe",
    },{
        _id: "S12345",
        student_name: "John Doe",
    },{
        _id: "S12345",
        student_name: "John Doe",
    },{
        _id: "S12345",
        student_name: "John Doe",
    },
    {
        _id: "S12346",
        student_name: "Jane Smith",
    },
    {
        _id: "S12347",
        student_name: "Alice Johnson",
    },
    {
        _id: "S12348",
        student_name: "Bob Brown",
    },
    {
        _id: "S12345",
        student_name: "John Doe",
    },
    {
        _id: "S12346",
        student_name: "Jane Smith",
    },
    {
        _id: "S12347",
        student_name: "Alice Johnson",
    },
    {
        _id: "S12348",
        student_name: "Bob Brown",
    },
];

const InstructorStudentsDetails = () => {
    const navigate = useNavigate();

    const handleRowClick = (student) => {
        const queryString = new URLSearchParams({
            id: student._id,
            name: student.student_name,
        }).toString();

        navigate(`/instructor/students-details/student?${queryString}`);
    };
    const handleClick = async (e) => {
        e.preventDefault();
        navigate(`/instructor/students-details/add-new-student`);
    };

    return (
        <section className="w-full flex flex-col gap-4 ">
            {/* Header */}
            <div
                className="bg-palatte-primary2 w-full h-[5rem] flex flex-col sm:flex-row justify-between items-center p-5 rounded-lg">
                <h1 className={`font-bold text-md text-white `}>
                    My Students
                </h1>
                <motion.button
                    whileTap={{scale: 0.95}}
                    whileHover={{scale: 1.025}}
                    className={`sm:w-[4rem] md:w-[6rem] lg:w-[8rem] h-[3rem] text-white bg-palatte-primary4 hover:bg-palatte-secondary rounded-lg cursor-pointer`}
                    onClick={handleClick}
                >
                    + New
                </motion.button>
            </div>

            {/* Search Bar */}
            <div className="bg-palatte-primary2 rounded-xl shadow-sm p-4 border-b border-palatte-secondary">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palatte-medium w-5 h-5"/>
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="w-full pl-10 pr-4 py-2 text-white bg-palatte-primary3 border border-palatte-secondary rounded-lg focus:outline-none focus:bg-palatte-secondary"
                    />
                </div>
            </div>

            {/* Student Table */}
            <div className="max-h-[35rem] bg-palatte-primary2 rounded-lg shadow-lg overflow-y-auto stylish-scrollbar ">
                {studentsList.length === 0 ? (
                    <p className="text-center italic text-palatte-medium">
                        No student details available.
                    </p>
                ) : (
                    <table className="min-w-full text-sm text-gray-300 ">
                        <thead className="sticky top-0 bg-palatte-secondary z-10">
                        <tr className="h-16 text-palatte-extraLight">
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Serial No.
                            </th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Student ID
                            </th>
                            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                                Name
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-palatte-secondary">
                        {studentsList.map((student, index) => (
                            <tr
                                key={student._id}
                                className="hover:bg-palatte-primary3 transition-all duration-150 ease-in-out cursor-pointer"
                                onClick={() => handleRowClick(student)}
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{student._id}</td>
                                <td className="px-6 py-4">{student.student_name || "N/A"}</td>
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
