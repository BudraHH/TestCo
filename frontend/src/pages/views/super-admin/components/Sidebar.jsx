import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn }from "../../../../utils/motion";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/super-admin/dashboard",
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
      path: "/super-admin/user-management",
    },
    {
      id: "assessments",
      label: "Assessments",
      icon: FileCheck,
      path: "/super-admin/assessments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/super-admin/settings",
    },
  ];

  return (
    <div className="w-64 flex flex-col bg-palatte-dark border-r border-palatte-secondary rounded-r-lg  px-4 py-6 shadow-lg overflow-hidden scrollbar-hide">
      <div className="flex items-center h-[5rem]">
        <LayoutDashboard className="h-8 w-8 text-palatte-light" />
        <span className="ml-2 text-xl font-bold text-palatte-light">
          TestCo
        </span>
      </div>
      <hr className="border border-palatte-secondary my-5" />
      <div className="h-full w-full flex flex-col justify-between items-center ">
        <nav className="w-full space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id} // Place the key here for uniqueness
                to={item.path}
                className="block" // Ensure the link spans the full button area
              >
                <motion.button
                variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileTap={{scale: 0.95}}
                  whileHover={{scale: 1.025}}
                  transition={{
                    duration: 0.02,  
                    ease: "easeInOut", 
                  }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === item.id
                      ? "bg-palatte-primary2 text-white ring-1 ring-palatte-secondary "
                      : "text-palatte-medium bg-palatte-dark hover:bg-palatte-primary2 "
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="ml-3 font-medium">{item.label}</span>
                </motion.button>
              </Link>
            );
          })}
        </nav>
        <div className="w-56">
          <hr className="border border-palatte-secondary my-5" />
          <button className="w-full flex items-center px-4 py-3 text-sm text-palatte-error  border border-palatte-secondary hover:bg-red-950 rounded-lg">
            <LogOut className="h-5 w-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
