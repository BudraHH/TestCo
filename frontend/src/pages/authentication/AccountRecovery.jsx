import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { styles } from "../../styles";

const AccountRecoveryPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRecovery = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!emailOrUsername.trim()) {
      setError("Please provide your email or username");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage(
        "Recovery link or instructions have been sent to your registered email."
      );
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.4 }}
        className="bg-palatte-primary1 border border-palatte-secondary p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <form onSubmit={handleRecovery} className="space-y-6">
          <h2 className="text-2xl font-bold text-palatte-light text-center">
            Account Recovery
          </h2>

          {/* Success/Failure Messages */}
          {message && (
            <p className="text-center text-green-600 font-medium">{message}</p>
          )}
          {error && (
            <p className="text-center text-red-500 font-medium">{error}</p>
          )}

          <div className="space-y-6">
            {/* Email or Username Field */}
            <div className="relative">
              <label
                htmlFor="emailOrUsername"
                className="block text-sm font-medium text-palatte-light mb-2"
              >
                Email or Username
              </label>
              <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                <FaUser className="text-palatte-extraLight mx-2" />
                <input
                  type="text"
                  id="emailOrUsername"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                  placeholder="Enter your email or username"
                  className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
                />
              </div>
            </div>

            {/* Recovery Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-palatte-light ${
                loading
                  ? "bg-palatte-dark cursor-not-allowed"
                  : "bg-palatte-secondary hover:bg-palatte-primary"
              } transition-all duration-300`}
            >
              {loading ? "Processing..." : "Recover Account"}
            </button>
          </div>

          {/* Links */}
          <div className="flex justify-between mt-4 text-sm">
            <Link
              to="/sign-in"
              className="text-palatte-medium hover:text-palatte-extraLight transition-colors"
            >
              Back to Sign In
            </Link>
            <motion.button
            initial="hidden"
            animate="show"
            whileTap={{scale: 0.95}}
              type="button"
              onClick={() => navigate("/need-help")}
              className="text-palatte-medium hover:text-red-800 transition-colors"
            >
              Need Help?
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default AccountRecoveryPage;
