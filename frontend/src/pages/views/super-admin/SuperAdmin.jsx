import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";

import { Outlet } from "react-router-dom";

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
      <div className="flex w-[100vw] h-[100vh] bg-palatte-dark">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-4 flex-1 flex flex-col overflow-hidden gap-4">
        <TopBar />
        <main className="h-[85vh] bg-palatte-primary1 rounded-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdmin;
