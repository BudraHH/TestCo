import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import TopBar from "../super-admin/components/TopBar.jsx";
import { useLocation } from "react-router-dom";

const Student = () => {
  const [activeTab, setActiveTab] = useState("home");
  const location = useLocation();

  useEffect(() => {
    // Sync activeTab with the current location
    const currentTab = location.pathname.split("/")[2] || "home"; // Assuming the second part of the path determines the tab
    setActiveTab(currentTab);
  }, [location]);

  return (
      <div className="flex w-[100vw] h-[100vh] bg-palatte-dark">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-4 flex-1 flex flex-col overflow-hidden gap-4">
          {/* Conditional TopBar rendering */}
          {activeTab === "home" && <TopBar />}

          <main className="h-[85vh]  rounded-lg">
            {/* This will render the nested routes */}
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default Student;
