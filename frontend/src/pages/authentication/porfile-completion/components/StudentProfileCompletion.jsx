import React from 'react';
import { motion } from 'framer-motion';

const StudentProfileCompletion = ({ formData, handleInputChange, handleSubmit, isSubmitting }) => {
  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
      <div className="bg-palatte-primary1 border border-palatte-secondary p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-palatte-light text-center mb-6">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-palatte-light mb-2"
            >
              Email Address
            </label>
            <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
              />
            </div>
          </div>

          {/* First Name Field */}
          <div className="relative">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-palatte-light mb-2"
            >
              First Name
            </label>
            <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div className="relative">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-palatte-light mb-2"
            >
              Last Name
            </label>
            <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
          whileTap={{scale:0.95}}
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-medium text-palatte-light ${
              isSubmitting
                ? "bg-palatte-dark cursor-not-allowed"
                : "bg-palatte-secondary hover:bg-palatte-secondary"
            } transition-all duration-300`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
      </div>
    </section>
  );
};

export default StudentProfileCompletion;
