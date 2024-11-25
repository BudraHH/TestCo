import React from "react";

import { motion } from "framer-motion";
import { fadeIn } from "../../../../../utils/motion.js";

const Profile = () => {
  return (
    <div className="space-y-12 p-4 bg-palatte-primary2 rounded-lg shadow-md">
      {/* Profile Picture Section */}
      <div className="flex items-center gap-6">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-palatte-medium object-cover shadow-md"
        />
        <div className="flex flex-row gap-4">
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
                  className="px-4 py-2 text-sm font-medium text-palatte-extraLight bg-palatte-primary4 rounded-lg hover:bg-palatte-secondary transition duration-200">
            Change
          </motion.button>
          <motion.button
                variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileTap={{scale: 0.95}}
                  whileHover={{scale: 1.025}}
                  transition={{
                    duration: 0.02,  
                    ease: "easeInOut", 
                  }} className="px-4 py-2 text-sm font-medium text-palatte-extraLight bg-red-800 rounded-lg hover:bg-red-900 transition duration-200">
             Remove
          </motion.button>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            label: "First Name",
            type: "text",
            defaultValue: "John",
            placeholder: "Enter your first name",
          },
          {
            label: "Last Name",
            type: "text",
            defaultValue: "Doe",
            placeholder: "Enter your last name",
          },
          {
            label: "Username",
            type: "text",
            defaultValue: "john_doe",
            placeholder: "Enter your username",
          },
          {
            label: "User ID",
            type: "text",
            defaultValue: "USER12345",
            placeholder: "Enter your user ID",
          },
          {
            label: "Email",
            type: "email",
            defaultValue: "john@example.com",
            placeholder: "Enter your email",
          },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-palatte-extraLight mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              defaultValue={field.defaultValue}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 bg-palatte-dark border border-palatte-primary3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-palatte-primary4 focus:border-palatte-primary4 text-palatte-extraLight placeholder:text-palatte-medium transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
