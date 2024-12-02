import { useState } from "react";
import { LayoutDashboard, Users, FileCheck, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import backendAPI from "../../../../backendAPI/index.js";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../../../store/userSlice.js"; // Import the action

const Sidebar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const dispatch = useDispatch();  // Initialize dispatch

  const menuItems = [
    {
      id: "home",
      label: "Home",
      icon: LayoutDashboard,
      path: "/instructor/home",
    },
    {
      id: "students",
      label: "My Students",
      icon: Users,
      path: "/instructor/students-details",
    },
    {
      id: "assessments",
      label: "Assessments",
      icon: FileCheck,
      path: "/instructor/assessments",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path: "/instructor/settings",
    },
  ];

  const handleSignOut = async () => {
    try {
      const response = await fetch(backendAPI.signOut.url, {
        method: "POST",  // Ensure the method is POST
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "request": "logout pannunga bhai",  // Message for sign-out (can be adjusted)
        }),
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`${response.statusText}`); // This will handle 404, 500, etc.
      }

      // Try to parse the response JSON
      const responseReceived = await response.json();

      console.log(responseReceived);

      // If sign-out is successful, clear user data from Redux
      if (responseReceived.success) {
        dispatch(clearUserDetails());  // Clear user data from Redux
        localStorage.removeItem("user");  // Clear user data from localStorage (optional)

        // Redirect to login page or home page
        window.location.href = "/";  // Change this to your login route
      } else {
        alert("Sign-out failed. Please try again.");
      }
    } catch (e) {
      // Handle non-JSON responses or any other error
      console.error(e);
      alert(`Sign-out failed. Please try again. Error: ${e.message}`);
    }
  };

  return (
      <div className="w-64 flex flex-col bg-palatte-dark border-r border-palatte-secondary rounded-r-lg px-4 py-6 shadow-lg overflow-hidden scrollbar-hide">
        {/* Header */}
        <div className="flex items-center h-[5rem]">
          <LayoutDashboard className="h-8 w-8 text-palatte-light" />
          <span className="ml-2 text-xl font-bold text-palatte-light">Instructor Panel</span>
        </div>
        <hr className="border border-palatte-secondary my-5" />

        {/* Navigation Menu */}
        <div className="h-full w-full flex flex-col justify-between items-center">
          <nav className="w-full space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                  <Link key={item.id} to={item.path} className="block" onClick={() => setActiveTab(item.path)}>
                    <motion.button
                        variants={fadeIn("center", "", 0.5, 0.25)}
                        initial="hidden"
                        animate="show"
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.025 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        aria-label={item.label}
                        className={`w-full flex items-center px-4 py-3 text-sm rounded-lg ${
                            activeTab === item.path
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
          <div className="w-full mt-4">
            <hr className="border border-palatte-secondary my-5" />
            <button
                className="w-full flex items-center px-4 py-3 text-sm text-palatte-error border border-palatte-secondary hover:bg-red-950 rounded-lg"
                onClick={handleSignOut}
                aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
