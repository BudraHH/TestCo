import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const InstructorSingleStudentDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    if (!id || !name) {
        return (
            <div className="flex justify-center items-center h-full text-palatte-medium">
                No student details found.
            </div>
        );
    }

    // Mock Data
    const studentDetails = {
        id,
        name,
        email,
        testsAttempted: 5,
        averageScore: 78,
        lastLogin: "2024-11-20 10:30 AM",
        recentTests: [
            { id: "T001", name: "Math Test", score: 85, category: "Mathematics", date: "2024-11-10" },
            { id: "T002", name: "Science Test", score: 72, category: "Science", date: "2024-11-12" },
        ],
    };

    // Chart Data
    const lineChartData = {
        labels: studentDetails.recentTests.map((test) => test.name),
        datasets: [
            {
                label: "Scores",
                data: studentDetails.recentTests.map((test) => test.score),
                borderColor: "#4caf50",
            },
        ],
    };

    return (
        <div className="p-4">
            <h1 className="text-xl text-white">Student Details: {name}</h1>
            <Line data={lineChartData} />
        </div>
    );
};

export default InstructorSingleStudentDetails;
