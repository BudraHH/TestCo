import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { FilePlus, UserPlus } from "lucide-react"; // Importing icons

const InstructorAddNewStudent = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileData, setFileData] = useState([]);
    const [isUploadFileActive, setIsUploadFileActive] = useState(false); // State to track the active section
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBackClick = () => {
        navigate(`/instructor/students-details`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Form submitted successfully:", formData);
            alert("Student account created successfully!");
            setFormData({ email: "", password: "" }); // Reset the form
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setFileData(jsonData);

                // Assuming the Excel has columns named 'email' and 'password'
                if (jsonData.length > 0) {
                    setFormData({
                        email: jsonData[0].email || "",
                        password: jsonData[0].password || "",
                    });
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <section className="w-full flex flex-col gap-4 p-4 ">
            {/* Header Section */}
            <div className="flex justify-between items-center bg-palatte-primary2 p-4 rounded-lg shadow-lg">
                <h1 className="text-lg font-bold text-white cursor-pointer" onClick={handleBackClick}>
                    My Students / <span className="font-semibold">Add New Student</span>
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

            {/* Content Section */}
            <div className="flex flex-col md:flex-row gap-4 bg-dark  rounded-lg shadow-lg ">
                {/* File Upload and Manual Upload Buttons */}
                <div className="flex flex-col gap-4 items-center justify-start  rounded-lg p-4 shadow-sm w-full md:w-auto bg-palatte-primary1
                ">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.025 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition duration-300 ease-in-out ${
                            isUploadFileActive ? 'text-white ring-2 ring-palatte-secondary bg-palatte-dark shadow-md' : 'text-palatte-medium bg-palatte-primary3 hover:bg-palatte-primary3 hover:text-palatte-light'
                        }`}
                        onClick={() => setIsUploadFileActive(true)} // Set file upload active
                    >
                        <FilePlus className="h-5 w-5" />
                        File
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.025 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition duration-300 ease-in-out   ${
                            !isUploadFileActive ? 'text-white ring-2 ring-palatte-secondary bg-palatte-dark shadow-md' : 'text-palatte-medium bg-palatte-primary3 hover:bg-palatte-primary3 hover:text-palatte-light'
                        }`}
                        onClick={() => setIsUploadFileActive(false)} // Set manual input active
                    >
                        <UserPlus className="h-5 w-5" />
                        Manually
                    </motion.button>
                </div>

                <div className={` w-full rounded-lg bg-palatte-primary1 p-4 shadow-lg`}>
                    {/* Conditionally Render File Upload or Manual Form */}
                    {isUploadFileActive ? (
                        <div className="space-y-4 w-full">
                            {/* Label for File Input */}
                            <label className="block text-palatte-light font-medium mb-2">Upload Excel File</label>

                            {/* File Input Section */}
                            <div
                                className="flex items-center justify-between bg-palatte-primary2 border border-palatte-secondary rounded-lg">
                                {/* Actual File Input */}
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileUpload}
                                    className="hidden" // Hide the default file input button
                                />

                                {/* Custom File Upload Button */}
                                <motion.label
                                    htmlFor="file-input"  // Use 'htmlFor' to associate with the hidden file input
                                    className="w-full flex items-center justify-center py-3 px-4 bg-palatte-primary4 text-white rounded-lg cursor-pointer hover:bg-palatte-secondary transition duration-300 ease-in-out"
                                >
                                    <FilePlus className="h-5 w-5 mr-3"/>
                                    <span>Upload File</span>
                                </motion.label>
                            </div>

                            {/* Display the selected file name (optional) */}
                            {fileData.length > 0 && (
                                <p className="text-sm text-palatte-light mt-2">
                                    {fileData.length} files selected.
                                </p>
                            )}
                        </div>

                    ) : (
                        <div className="w-full">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="block text-palatte-extraLight font-medium">Student Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-palatte-primary2 text-palatte-extraLight border border-palatte-secondary rounded-lg focus:ring-2 focus:ring-palatte-primary4 focus:outline-none"
                                        placeholder="student@example.com"
                                    />
                                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="block text-palatte-extraLight font-medium">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-palatte-primary2 text-palatte-extraLight border border-palatte-secondary rounded-lg focus:ring-2 focus:ring-palatte-primary4 focus:outline-none"
                                        placeholder="Enter password"
                                    />
                                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3 w-full bg-palatte-primary4 text-palatte-extraLight rounded-lg hover:bg-palatte-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Creating..." : "Create Account"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InstructorAddNewStudent;
