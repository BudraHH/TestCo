import { useOutletContext } from "react-router-dom";
import DashboardStats from "../components/DashboardStats";
import ActivityChart from "../components/ActivityChart";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

const InstructorHome = () => {
    const {
        userDetails,
        statsData,
        activityData,
        loading,
        error,
        setLoading,
        setError,
    } = useOutletContext(); // Get props from the parent component

    if (loading) {
        return (
            <div className="p-4 space-y-4">
                <div className="text-center text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 space-y-4">
                <div className="text-red-500 text-center">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <div className="w-50 flex space-x-2">
                    <motion.select
                        variants={fadeIn("center", "", 0.5, 0.25)}
                        initial="hidden"
                        animate="show"
                        whileHover={{ scale: 1.025 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="text-lg px-4 py-2 bg-palatte-secondary hover:bg-palatte-primary4 cursor-pointer text-palatte-extraLight rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary1 transition-all duration-300"
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                    </motion.select>
                </div>
            </div>

            {/* Display Stats Data */}
            {statsData ? (
                <DashboardStats stats={statsData} />
            ) : (
                <div className="text-center text-gray-500">Stats data not available.</div>
            )}

            {/* Display Activity Data */}
            {activityData ? (
                <ActivityChart data={activityData} />
            ) : (
                <div className="text-center text-gray-500">Activity data not available.</div>
            )}
        </div>
    );
};

export default InstructorHome;
