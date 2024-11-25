import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "../super-admin/components/TopBar.jsx";

const Instructor = () => {
    const [activeTab, setActiveTab] = useState("home");
    const location = useLocation();

    // Determine if the current route is the home route
    const isHomeRoute = location.pathname === "/instructor/home";

    return (
        <div className="flex w-[100vw] h-[100vh] bg-palatte-dark">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="p-4 flex-1 flex flex-col overflow-hidden gap-4">
                {/* Conditionally render TopBar only if the active route is "home" */}
                {isHomeRoute && <TopBar />}

                <main className="h-[100vh] rounded-lg ">
                    {/* This will render the nested routes */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Instructor;
