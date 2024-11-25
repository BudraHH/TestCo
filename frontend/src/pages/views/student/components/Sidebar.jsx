import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    FileCheck,
    Settings,
    LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const location = useLocation();

    const menuItems = [
        {
            id: "home",
            label: "Home",
            icon: LayoutDashboard,
            path: "/student/home",
        },
        {
            id: "assessments",
            label: "My Assessments",
            icon: FileCheck,
            path: "/student/my-assessments",
        },
        // {
        //     id: "results",
        //     label: "My Results",
        //     icon: Users,
        //     path: "/student/my-results",
        // },
        {
            id: "account",
            label: "Account",
            icon: Settings,
            path: "/student/account-settings",
        },
    ];

    useEffect(() => {
        // Sync activeTab with the current location
        const currentTab = menuItems.find((item) =>
            location.pathname.startsWith(item.path)
        );
        if (currentTab) {
            setActiveTab(currentTab.id);
        }
    }, [location, menuItems, setActiveTab]);

    return (
        <div className="w-64 flex flex-col bg-palatte-dark border-r border-palatte-secondary rounded-r-lg px-4 py-6 shadow-lg overflow-hidden scrollbar-hide">
            {/* Header */}
            <div className="flex items-center h-[5rem]">
                <LayoutDashboard className="h-8 w-8 text-palatte-light" />
                <span className="ml-2 text-xl font-bold text-palatte-light">TestCo</span>
            </div>
            <hr className="border border-palatte-secondary my-5" />

            {/* Navigation Menu */}
            <div className="h-full w-full flex flex-col justify-between items-center">
                <nav className="w-full space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.id} to={item.path} className="block">
                                <motion.button
                                    variants={fadeIn("center", "", 0.5, 0.25)}
                                    initial="hidden"
                                    animate="show"
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.025 }}
                                    transition={{
                                        duration: 0.02,
                                        ease: "easeInOut",
                                    }}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
                                        activeTab === item.id
                                            ? "bg-palatte-primary2 text-white ring-1 ring-palatte-secondary"
                                            : "text-palatte-medium bg-palatte-dark hover:bg-palatte-primary2"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="ml-3 font-medium">{item.label}</span>
                                </motion.button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="w-56">
                    <hr className="border border-palatte-secondary my-5" />
                    <button className="w-full flex items-center px-4 py-3 text-sm text-palatte-error border border-palatte-secondary hover:bg-red-950 rounded-lg">
                        <LogOut className="h-5 w-5" />
                        <span className="ml-3 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
