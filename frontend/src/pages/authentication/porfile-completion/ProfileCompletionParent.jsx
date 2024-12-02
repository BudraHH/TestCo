import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCompletion from "./ProfileCompletion";
import backendAPI from "../../../backendAPI/index.js";

const ProfileCompletionParent = () => {
    const { role: roleFromParams } = useParams(); // Get the role from URL parameters
    const { email: emailFromRedux, role: roleFromRedux, accessToken: tokenFromRedux } = useSelector((state) => state.user.user);

    const navigate = useNavigate();
    // Debugging logs to check values
    useEffect(() => {
        console.log("Redux Email:", emailFromRedux);
        console.log("Redux Role:", roleFromRedux);
        console.log("Redux Token:", tokenFromRedux); // Check if token is fetched correctly
    }, [emailFromRedux, roleFromRedux, tokenFromRedux]);

    const [userRole, setUserRole] = useState(roleFromRedux || roleFromParams || ""); // Default to Redux, fallback to params
    const [email, setEmail] = useState(emailFromRedux || "");
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize form data based on user role
    useEffect(() => {
        const initializeFormData = () => {
            const baseData = { email: email || "" }; // Base data includes email
            switch (userRole.toLowerCase()) {
                case "student":
                    return {
                        ...baseData,
                        firstName: "",
                        lastName: "",
                    };
                case "instructor":
                    return {
                        ...baseData,
                        name: "",
                        age: "",
                        gender: "",
                        contactNumber: "",
                        courses: [],
                    };
                case "admin":
                    return {
                        ...baseData,
                        adminCode: "",
                        firstName: "",
                        lastName: "",
                    };
                default:
                    return baseData;
            }
        };

        setFormData(initializeFormData());
    }, [userRole, email]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "courses") {
            setFormData((prevData) => {
                let updatedCourses = [...prevData.courses];  // Create a copy of the current courses array

                if (checked) {
                    // Add the selected course to the array if it's checked
                    updatedCourses.push(value);
                } else {
                    // Remove the unselected course from the array if it's unchecked
                    updatedCourses = updatedCourses.filter((course) => course !== value);
                }

                return {
                    ...prevData,
                    courses: updatedCourses,  // Update the courses field with the new array
                };
            });
        } else {
            // Handle other fields (email, name, etc.)
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            // Check token value before using it in the request
            const token = tokenFromRedux;
            if (!token) {
                console.error("Token not found!");  // Log error if no token is found
                return;
            }

            const response = await fetch(backendAPI.profileCompletion.url, {
                method: backendAPI.profileCompletion.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "", // Attach token
                },
                body: JSON.stringify({
                    role: userRole,
                    email,
                    ...formData,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server:", data);

            if (data.success) {
                alert("Profile submitted successfully!");
                switch (userRole) {
                    case 'Student':
                        navigate(`/student/home`);
                        break;
                    case 'Instructor':
                        navigate(`/instructor/home`);
                        break;
                }

            } else {
                alert(`Submission failed: ${data.message}`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="App">
            <ProfileCompletion
                userRole={userRole}
                email={email}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default ProfileCompletionParent;
