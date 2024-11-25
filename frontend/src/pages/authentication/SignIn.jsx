import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Context from "../../context";
import { useContext } from "react";
import backendApi from "../../backendAPI";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Welcome back!"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      showCursor: false, // Hides the cursor
    });

    // Cleanup Typed.js instance
    return () => {
      typed.destroy();
    };
  }, []);

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIncorrectEmail(false);
    setIncorrectPassword(false);

    // if (!emailRegex.test(email)) {
    //   setIncorrectEmail(true);
    //   return;
    // }
    // if (password.length < 6) {
    //   setIncorrectPassword(true);
    //   return;
    // }

    setIsLoading(true);
    const signInData = { email, password };

    try {
      const response = await fetch(
        `https://1802-2401-4900-7b98-1bfd-181b-eef6-5ff8-ae1d.ngrok-free.app/auth/login`,
        {
          method: "POST",
          credentials: "include", // Ensures cookies are sent with the request
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json", // Add Accept header if needed
          },
          body: JSON.stringify(signInData),
        }
      );
      console.log(response.body.data);
      if (!response.ok) {
        // Log non-2xx responses for debugging
        console.error(`HTTP error! status: ${response.status}`);
        setIncorrectEmail(true);
        setIncorrectPassword(true);
        return;
      }

      const dataResponse = await response.json();
      if (dataResponse.success) {
        navigate("/"); // Navigate to the home page on success
        fetchUserDetails(); // Fetch user details if the sign-in is successful
      } else {
        if (dataResponse.message === "User not found") setIncorrectEmail(true);
        if (dataResponse.message === "Password is incorrect!")
          setIncorrectPassword(true);
      }

      if (dataResponse.role === "SuperAdmin") {
        navigate(`/super-admin/dashboard`);
      } else if (dataResponse.role === "Instructor") {
        navigate(`/instructor`);
      } else if (dataResponse.role === "Student") {
        navigate(`/student`);
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[100vh] w-[100vw] flex items-center justify-center bg-palatte-dark p-6">
      <div className="bg-palatte-primary1 border border-palatte-secondary p-8 rounded-xl shadow-2xl w-full max-w-md">
        <form onSubmit={handleSignIn} className="space-y-4">
          <h2
            ref={typedRef}
            className="text-2xl font-bold text-palatte-light text-center"
            style={{ minHeight: "2.5rem" }} // Adjust height to match your font size
          ></h2>

          <motion.div
            variants={fadeIn("center", "", 1, 0.5)}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="relative">
                <div className="flex flex-row justify-between">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-palatte-light mb-2"
                  >
                    Email Address
                  </label>
                  {incorrectEmail && (
                    <p className="absolute right-0 text-sm text-red-500">
                      Invalid email!
                    </p>
                  )}
                </div>
                <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                  <FaEnvelope className="text-palatte-extraLight mx-2" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-palatte-light mb-2"
                  >
                    Password
                  </label>
                  {incorrectPassword && (
                    <p className="absolute right-0 text-sm text-red-500">
                      Incorrect password!
                    </p>
                  )}
                </div>
                <div className="flex items-center bg-palatte-secondary border border-palatte-secondary rounded-lg p-2 focus-within:bg-palatte-primary1 focus-within:ring-palatte-primary">
                  <FaLock className="text-palatte-extraLight mx-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-palatte-light placeholder-palatte-medium focus:outline-none p-2"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-palatte-extraLight hover:text-palatte-primary mx-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full py-3 rounded-lg font-medium text-palatte-light ${
                  isLoading
                    ? "bg-palatte-dark cursor-not-allowed"
                    : "bg-palatte-secondary hover:bg-palatte-secondary"
                } transition-all duration-300`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Forgot Password */}
              <motion.button
              initial="hidden"
              animate="show"
              whileTap={{scale: 0.95}}
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-palatte-medium hover:text-red-800 transition-colors"
              >
                Forgot Password?
              </motion.button>
            </div>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
