import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/userSlice.js";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import backendAPI from "../../backendAPI/index.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Welcome back!"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const signInData = { email, password };

    try {
      const response = await fetch(backendAPI.signIn.url, {
        method: backendAPI.signIn.method,
        credentials: "include", // Ensure cookies are sent and received
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Sign-in failed. Please try again.");
        return;
      }

      const dataResponse = await response.json();
      if (dataResponse.success) {
        // Log document.cookie to check if token is set
        // console.log("cookies:", document.cookie);

        // Function to get cookie value by name
        // const getCookieValue = (cookieName) => {
        //   const cookies = document.cookie
        //       .split('; ')
        //       .find((row) => row.startsWith(`${cookieName}=`));
        //   return cookies ? cookies.split('=')[1] : null;
        // };
        //
        // const token = getCookieValue('token');


        // console.log("Token from cookie:", token); // Logs the token

        // If token is found, proceed

          const { role, profileCompleted, email, accessToken } = dataResponse;
          console.log("Role:", role, "Profile Completed:", profileCompleted, "Email:", email, "Token:", accessToken);

          // Store token in local storage
          localStorage.setItem("access_token", accessToken); // Store token in local storage

          // Dispatch user details to Redux
          dispatch(setUserDetails({ email, role, accessToken }));

          // Navigate based on role and profile completion status
          if (profileCompleted) {
            switch (role) {
              case "SuperAdmin":
                navigate("/super-admin/dashboard");
                break;
              case "Instructor":
                navigate("/instructor/home");
                break;
              case "Student":
                navigate("/student/home");
                break;
              default:
                setErrorMessage("Unknown user role.");
            }
          } else {
            navigate(`/profile-completion/${role}`);
          }

      } else {
        setErrorMessage(dataResponse.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred. Please try again later.");
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
                style={{ minHeight: "2.5rem" }}
            ></h2>

            <motion.div
                variants={fadeIn("center", "", 1, 0.5)}
                initial="hidden"
                animate="show"
            >
              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="relative">
                  <label
                      htmlFor="email"
                      className="block text-sm font-medium text-palatte-light mb-2"
                  >
                    Email Address
                  </label>
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
                  <label
                      htmlFor="password"
                      className="block text-sm font-medium text-palatte-light mb-2"
                  >
                    Password
                  </label>
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

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                )}

                {/* Sign In Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg font-medium text-palatte-light ${
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
                    whileTap={{ scale: 0.95 }}
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
