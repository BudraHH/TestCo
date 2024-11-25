import React, { useState } from "react";
import { Lock, Key } from "lucide-react";
import { motion } from "framer-motion";

const Security = () => {
  const inputFields = [
    { label: "Current Password", icon: Lock, type: "password" },
    { label: "New Password", icon: Key, type: "password" },
  ];

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {!isLoading ? (
        <div className="flex flex-col gap-4">
          {/* Change Password Section */}
          <div className="space-y-4 p-4 bg-palatte-primary2 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-palatte-extraLight">
              Change Password
            </h3>
            <hr className="border border-palatte-secondary my-4" />
            <div className="space-y-4">
              {inputFields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-palatte-extraLight mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-palatte-medium w-5 h-5" />
                    <input
                      type={field.type}
                      className="w-full pl-10 pr-4 py-3 bg-palatte-dark border border-palatte-primary4 rounded-lg text-palatte-extraLight placeholder:text-palatte-medium focus:outline-none focus:ring-2 focus:ring-palatte-primary4 transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.025 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="px-6 py-3 bg-palatte-primary4 text-palatte-extraLight rounded-lg hover:bg-palatte-primary3 transition-all"
              >
                Update Password
              </motion.button>
            </div>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="space-y-4 p-4 bg-palatte-primary2 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-palatte-extraLight mb-4">
              Two-Factor Authentication
            </h3>
            <hr className="border border-palatte-secondary my-4" />
            <div className="flex items-center justify-between p-6 bg-palatte-dark rounded-lg shadow-md">
              <div>
                <p className="font-medium text-palatte-extraLight">
                  Enhance your account security
                </p>
                <p className="text-sm text-palatte-medium">
                  Add an extra layer of security to your account by enabling
                  2FA
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.025 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="px-6 py-3 bg-palatte-primary4 text-palatte-extraLight rounded-lg hover:bg-palatte-primary3 transition-all"
              >
                Enable 2FA
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-palatte-extraLight">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Security;
