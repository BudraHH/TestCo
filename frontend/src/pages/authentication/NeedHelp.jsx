import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NeedHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your message has been submitted successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    }, 2000);
  };

  // FAQ data
  const faqs = [
    {
      question: "How can I reset my password?",
      answer:
        'Use the "Forgot Password" option on the sign-in page to receive a reset link.',
    },
    {
      question: "How do I recover my account?",
      answer:
        "Use the account recovery page to recover your account with your email or username.",
    },
    {
      question: "How can I contact support?",
      answer: (
        <>
          Use the contact form below or email us at{" "}
          <a
            href="mailto:support@example.com"
            className="text-palatte-primary font-medium underline hover:text-palatte-extraLight transition-colors"
          >
            support@example.com
          </a>
          .
        </>
      ),
    },
    {
      question: "How do I create a new test in the platform?",
      answer:
        "To create a new test, navigate to the 'Tests' section and click on the 'Create New Test' button. Fill in the test details, including title, description, and add questions. Once done, click 'Save' to finalize your test.",
    },
    {
      question: "Can I add different question types to my tests?",
      answer:
        "Yes, you can add multiple question types such as multiple choice, short answer, true/false, and essay questions to your test. Simply select the desired question type when adding a new question.",
    },
    {
      question: "How do I assign a test to students?",
      answer:
        "To assign a test, go to the 'Assignments' section, select the test you want to assign, and choose the group or individual students. Set the start and end time for the test, and then click 'Assign'.",
    },
    {
      question: "Can I track student progress during a test?",
      answer:
        "Yes, you can monitor student progress in real-time from the 'Live Test Monitoring' section. This feature allows you to see how much time each student has left and whether they have completed the test.",
    },
    {
      question: "How do I grade the tests?",
      answer:
        "Once a test is submitted by students, navigate to the 'Results' section, select the test, and review the answers. You can manually grade essay-type answers and automatically grade objective questions like multiple choice.",
    },
    {
      question: "Can I export test results?",
      answer:
        "Yes, you can export test results as a CSV file. After reviewing the test results, click on 'Export' in the results section to download the data for further analysis or reporting.",
    },
    {
      question: "How do I manage test security?",
      answer:
        "You can enhance test security by enabling features like time limits, question randomization, and preventing students from navigating away from the test page during the exam. You can find these options in the test settings.",
    },
    {
      question: "Can I schedule a test in advance?",
      answer:
        "Yes, you can schedule tests to be automatically released at a future date and time. Go to the 'Schedule Test' section and set the desired date and time for your test to go live.",
    },
    {
      question: "What happens if a student encounters a technical issue during a test?",
      answer:
        "If a student encounters a technical issue, they should immediately contact support using the contact form or by emailing support@example.com. We will assist them in resolving the issue, and depending on the situation, the test may be re-opened or extended.",
    },
    {
      question: "Can I set up a timer for each question?",
      answer:
        "Yes, you can set up a timer for each question individually or for the entire test. This can be done in the 'Test Settings' section, where you can specify how much time each question or the whole test should take.",
    },
  ];
  

  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="bg-palatte-primary1 border border-palatte-secondary p-8 rounded-2xl shadow-2xl w-full "
      >
        <div className="space-y-8">
          {/* Page Heading */}
          <div className="text-center flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-extrabold text-palatte-light">
                Need Help?
              </h2>
              <p className="text-palatte-medium text-sm font-normal">
                We’re here to assist you! Check the FAQs below or contact us
                directly.
              </p>
            </div>

            <hr className="border border-palatte-secondary" />
          </div>

          {/* Horizontal Layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start space-x-8">
            {/* FAQs Section */}
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-semibold text-palatte-light">
                Frequently Asked Questions
              </h3>
              <hr className="border-palatte-secondary"/>
              <div className="overflow-auto stylish-scrollbar max-h-[24rem]">
              <ul className="space-y-4">
                {faqs.map((faq, index) => (
                  <div>
                    <li key={index} className="text-palatte-light">
                    <strong>Q:</strong> {faq.question}
                    <br />
                    <strong>A:</strong> {faq.answer}
                    <hr className="mt-4 mx-4 border border-palatte-secondary"/>
                  </li>
                  </div>
                ))}
              </ul>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="w-[2px] border border-palatte-secondary"></div>

            {/* Contact Section */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-palatte-light mb-4">
                Contact Support
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {["name", "email", "message"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-palatte-light mb-1"
                    >
                      {field === "message"
                        ? "Your Message"
                        : `Your ${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }`}
                    </label>
                    {field === "message" ? (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="How can we help you?"
                        className="w-full bg-palatte-primary2 text-palatte-light placeholder-palatte-medium border border-palatte-secondary rounded-lg p-3 focus:bg-palatte-primary4 focus:ring-palatte-primary focus:outline-none resize-none stylish-scrollbar"
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${field}`}
                        className="w-full bg-palatte-primary2 text-palatte-light placeholder-palatte-medium border border-palatte-secondary rounded-lg p-3 focus:bg-palatte-primary4  focus:outline-none"
                      />
                    )}
                  </div>
                ))}
                <motion.button
                initial="hidden"
                animate="show"
                whileTap={{scale: 0.95}}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium text-palatte-light ${
                    isSubmitting
                      ? "bg-palatte-dark cursor-not-allowed"
                      : "bg-palatte-secondary hover:bg-palatte-dark hover:scale-5 transform transition-all duration-300"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-palatte-medium hover:text-palatte-light text-lg font-medium transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NeedHelp;
