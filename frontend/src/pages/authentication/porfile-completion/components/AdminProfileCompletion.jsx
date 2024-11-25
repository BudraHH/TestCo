import React from 'react';

const AdminProfileCompletion = ({ formData, handleInputChange, handleSubmit, isSubmitting }) => {
  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
      <div className="bg-palatte-primary1 border border-palatte-secondary p-5 rounded-xl shadow-2xl h-[80vh] w-full max-w-lg flex flex-col">
        <h2 className="text-2xl font-medium text-palatte-light text-center">
          Complete Your Profile
        </h2>
        <hr className="border border-palatte-secondary my-5" />
        <div className="overflow-y-auto stylish-scrollbar max-h-[50rem] pr-1">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Pre-filled Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-palatte-light mb-2">
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

            {/* Admin Code */}
            <div className="relative">
              <label htmlFor="adminCode" className="block text-sm font-medium text-palatte-light mb-2">
                Admin Code
              </label>
              <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                <input
                  type="text"
                  id="adminCode"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
                />
              </div>
            </div>

            {/* First Name */}
            <div className="relative">
              <label htmlFor="firstName" className="block text-sm font-medium text-palatte-light mb-2">
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

            {/* Last Name */}
            <div className="relative">
              <label htmlFor="lastName" className="block text-sm font-medium text-palatte-light mb-2">
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

            {/* Contact Number */}
            <div className="relative">
              <label htmlFor="contactNumber" className="block text-sm font-medium text-palatte-light mb-2">
                Contact Number
              </label>
              <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="relative">
              <label htmlFor="gender" className="block text-sm font-medium text-palatte-light mb-2">
                Gender
              </label>
              <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2 cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Organization (Select) */}
            <div className="relative">
              <label htmlFor="organization" className="block text-sm font-medium text-palatte-light mb-2">
                Organization
              </label>
              <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                <select
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2 cursor-pointer"
                >
                  <option value="">Select Organization</option>
                  <option value="org1">Organization 1</option>
                  <option value="org2">Organization 2</option>
                  <option value="org3">Organization 3</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-medium text-palatte-light ${
                isSubmitting
                  ? 'bg-palatte-dark cursor-not-allowed'
                  : 'bg-palatte-secondary hover:bg-palatte-secondary'
              } transition-all duration-300`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminProfileCompletion;
