import { memo } from "react";
import { motion } from "framer-motion";
import InputField from "./page-components/InputField.jsx";
import SelectField from "./page-components/SelectField.jsx";

const InstructorProfileCompletion = memo(({ formData, handleInputChange, handleSubmit, isSubmitting }) => {
    // Ensure courses is always an array, in case formData is missing courses
    // const courses = formData.courses || [];

    // console.log(formData);  // Debugging: Logs the form data, you may remove this in production

    return (
        <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
            <div className="bg-palatte-primary1 border border-palatte-secondary p-5 rounded-xl shadow-2xl h-[80vh] w-full max-w-lg flex flex-col">
                <h2 className="text-2xl font-medium text-palatte-light text-center">
                    Complete Your Profile
                </h2>
                <hr className="border border-palatte-secondary my-5" />
                <div className="overflow-y-auto stylish-scrollbar max-h-[50rem] pr-1">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <InputField
                            id="email"
                            label="Email Address"
                            value={formData.email}
                            name="email"
                            readOnly
                        />

                        {/* Name Field */}
                        <InputField
                            id="name"
                            label="Name"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                            required
                        />

                        {/* Age Field */}
                        <InputField
                            id="age"
                            label="Age"
                            value={formData.age}
                            name="age"
                            onChange={handleInputChange}
                            required
                        />

                        {/* Gender Select */}
                        <SelectField
                            id="gender"
                            label="Gender"
                            value={formData.gender}
                            name="gender"
                            options={[
                                { value: "", label: "Select Gender" },
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                            ]}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Contact Number Field */}
                        <InputField
                            id="contactNumber"
                            label="Contact Number"
                            value={formData.contactNumber}
                            name="contactNumber"
                            onChange={handleInputChange}
                            required
                        />

                        {/* Courses Taught Checkboxes */}
                        <div className="w-full flex flex-col gap-2">
                            <label htmlFor="courses" className="block text-sm font-medium text-palatte-light">
                                Courses Taught
                            </label>
                            <div className="w-full px-4 py-5 flex flex-col justify-start items-start gap-5 bg-palatte-primary2 text-palatte-extraLight border border-palatte-secondary rounded-lg focus:ring-2 focus:ring-palatte-primary4 focus:outline-none">
                                {[
                                    "Database Management Systems",
                                    "Operating Systems",
                                    "Data Structures",
                                    "Computer Networks"
                                ].map((course) => (
                                    <label key={course} className="flex items-center text-palatte-extraLight cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="courses"
                                            value={course}
                                            checked={formData.courses.includes(course)}  // Use the initialized courses array
                                            onChange={(e) => handleInputChange(e)}
                                            className="mr-2 w-5 h-5 rounded-lg border-palatte-light focus:ring-1 focus:ring-palatte-light"
                                        />
                                        <span className="font-medium">{course}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 rounded-lg font-medium text-palatte-light ${isSubmitting
                                ? "bg-palatte-dark cursor-not-allowed"
                                : "bg-palatte-secondary hover:bg-palatte-secondary"
                            } transition-all duration-300`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </section>
    );
});

export default InstructorProfileCompletion;
