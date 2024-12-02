import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserDetails as setUserDetailsAction } from "../../../store/userSlice";
import backendApi from "../../../backendAPI/index.js";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";

const Instructor = () => {
    const dispatch = useDispatch();
    const { accessToken: tokenFromRedux } = useSelector((state) => state.user.user || {});
    const [userDetails, setUserDetailsState] = useState(null);
    const [statsData, setStatsData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [courses, setCourses] = useState([]); // State to hold course names
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user details
    const fetchUserDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!tokenFromRedux) {
                console.error("Authorization token is missing.");
                return;
            }

            const response = await fetch(backendApi.currentUser.url, {
                method: backendApi.currentUser.method || "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenFromRedux}`,
                },
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                let errorMessage = "Failed to fetch user detail.";
                if (contentType?.includes("application/json")) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                }
                throw new Error(`${response.status} - ${response.statusText}: ${errorMessage}`);
            }

            const data = await response.json();
            if (!data.success || !data.user) {
                throw new Error(data.message || "Invalid user data received.");
            }

            console.log("Fetched user data from backend", data);
            setUserDetailsState(data.user); // Update user details in state
        } catch (err) {
            console.error("Error fetching user details:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Extract courses from user details
    const extractCourses = (userDetails) => {
        if (userDetails?.courses) {
            const courseNames = userDetails.courses.map((course) => course.name);
            setCourses(courseNames);
        }
    };
    // console.log("Courses handled:", courses);

    // Run fetchUserDetails and extractCourses on mount or when userDetails changes
    useEffect(() => {
        fetchUserDetails();
    }, [tokenFromRedux]);

    useEffect(() => {
        if (userDetails) {
            extractCourses(userDetails);
        }
    }, [userDetails]);

    const location = useLocation();
    const isHomeRoute = location.pathname === "/instructor/home";

    return (
        <div className="flex w-[100vw] h-[100vh] bg-palatte-dark">
            {/* Sidebar */}
            <Sidebar activeTab={"home"} setActiveTab={() => {}} />

            <div className="p-4 flex-1 flex flex-col overflow-hidden gap-4">
                {/* Conditionally render TopBar only if the active route is "home" */}
                {!loading && isHomeRoute && (
                    <TopBar userDetails={userDetails} courses={courses} />
                )}

                <main className="h-[100vh] rounded-lg">
                    {/* Pass the necessary props down to InstructorHome */}
                    <Outlet context={{
                        userDetails,
                        setUserDetailsState,
                        statsData,
                        activityData,
                        courses,
                        loading,
                        error,
                        setLoading,
                        setError,
                    }} />
                </main>
            </div>
        </div>
    );
};

export default Instructor;
