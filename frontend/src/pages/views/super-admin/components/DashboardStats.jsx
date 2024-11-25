import React from 'react';
import { Users, GraduationCap, UserCheck, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../../utils/motion';
// Define the StatCard component
const StatCard = ({ title, value, change, icon: Icon, color, bg }) => (
  <motion.div 
  variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileTap={{scale: 0.95}}
                  whileHover={{scale: 1.025}}
                  transition={{
                    duration: 0.02,  
                    ease: "easeInOut", 
                  }}
  className="bg-palatte-primary3 p-6 rounded-xl  hover:bg-palatte-primary4 transition-shadow duration-300 ease-in-out cursor-pointer">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-sm text-palatte-extraLight">{title}</p>
      <p className="text-2xl font-semibold mt-1 text-palatte-light">{value}</p>
    </div>
    <div className={`${bg} w-14 h-14 rounded-lg flex justify-center items-center`}>
      {/* Ensure the icon component is rendered properly */}
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
  </div>
  <div className="mt-4 flex items-center">
    <span className="text-green-500 text-sm font-medium">{change}</span>
    <span className="text-palatte-medium text-sm ml-2">vs last period</span>
  </div>
</motion.div>

);

// Define the stats array
const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '+12%',
    icon: Users,
    color: 'text-blue-800',
    bg: 'bg-blue-200',
  },
  {
    title: 'Students',
    value: '10,123',
    change: '+8%',
    icon: GraduationCap,
    color: 'text-green-600',
    bg: 'bg-green-200',
  },
  {
    title: 'Instructors',
    value: '2,032',
    change: '+15%',
    icon: UserCheck,
    color: 'text-pink-600',
    bg: 'bg-pink-100',
  },
  {
    title: 'Assessments',
    value: '5,678',
    change: '+20%',
    icon: FileCheck,
    color: 'text-orange-600',
    bg: 'bg-orange-200',
  },
];

// Define the DashboardStats component
const DashboardStats = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
        ))}
      </div>
  );
};

export default DashboardStats;
