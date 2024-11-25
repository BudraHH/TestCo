import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";

const StudentSingleAssessmentDetails = () => {
    const location = useLocation();
    const [assessmentDetails, setAssessmentDetails] = useState(null);

    useEffect(() => {
        // Parse query parameters to get assessment data
        const params = new URLSearchParams(location.search);
        const details = {
            title: params.get("title"),
            instructor: params.get("instructor"),
            type: params.get("type"),
            status: params.get("status"),
            dueDate: params.get("dueDate"),
            submissions: params.get("submissions") === "true", // Convert to boolean
            subject: params.get("subject"),
            id: params.get("id"),
        };
        setAssessmentDetails(details);
    }, [location]);

    if (!assessmentDetails) return null;

    return (
        <section className="w-full flex flex-col gap-6 p-6 bg-gradient-to-br from-palatte-primary1 to-palatte-primary2 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center bg-palatte-primary3 text-palatte-extraLight p-5 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold tracking-wide">Assessment Details</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()} // Go back to previous page
                    className="flex items-center gap-2 px-4 py-2 text-palatte-extraLight bg-palatte-primary4 rounded-lg shadow hover:bg-palatte-secondary"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </motion.button>
            </div>

            {/* Content */}
            <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <h3 className="text-3xl font-semibold text-palatte-dark">{assessmentDetails.title}</h3>
                    <span
                        className={`mt-4 md:mt-0 inline-block px-4 py-2 rounded-full text-sm font-bold ${
                            assessmentDetails.status === "Active"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                        {assessmentDetails.status}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-lg text-palatte-dark">
                        <strong>Instructor:</strong> {assessmentDetails.instructor}
                    </p>
                    <p className="text-lg text-palatte-dark">
                        <strong>Subject:</strong> {assessmentDetails.subject}
                    </p>
                    <p className="text-lg text-palatte-dark">
                        <strong>Type:</strong> {assessmentDetails.type}
                    </p>
                    <p className="text-lg flex items-center text-palatte-dark">
                        <Clock className="w-5 h-5 mr-2 text-palatte-primary4" />
                        <strong>Due Date:</strong> {assessmentDetails.dueDate}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    <p className="text-lg text-palatte-dark">
                        <strong>Completion Status:</strong>{" "}
                        <span
                            className={`font-semibold ${
                                assessmentDetails.submissions ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {assessmentDetails.submissions ? "Completed" : "Not Completed"}
                        </span>
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <motion.div
                className="bg-gradient-to-r from-palatte-secondary to-palatte-primary4 text-palatte-extraLight p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
            >
                <h2 className="text-xl font-bold">Next Steps</h2>
                <p className="text-sm mt-2">
                    Make sure to review the feedback for this assessment if available, or reach out to your instructor
                    for further queries.
                </p>
            </motion.div>
        </section>
    );
};

export default StudentSingleAssessmentDetails;
