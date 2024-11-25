import React from "react";
import DashboardStats from "../components/DashboardStats";
import ActivityChart from "../components/ActivityChart";
import { motion } from "framer-motion";
import { fadeIn } from '../../../../utils/motion';


const SuperAdminDashboard = () => {
  return (
    <div className="p-4 space-y-4">
      <div className=" flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>
        <div className="w-50  flex space-x-2">
          <motion.select 
          variants={fadeIn("center", "", 0.5, 0.25)}
          initial="hidden"
          animate="show"
          // whileTap={{scale: 0.95}}
          whileHover={{scale: 1.025}}
          transition={{
            duration: 0.02,  
            ease: "easeInOut", 
          }}
          className="text-3xl px-4 py-2 bg-palatte-secondary hover:bg-palatte-primary4 cursor-pointer text-palatte-extraLight rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-palatte-primary1 transition-all duration-300 ease-in-out">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </motion.select>
        </div>
      </div>

      <DashboardStats />
      <ActivityChart />
    </div>
  );
};

export default SuperAdminDashboard;
