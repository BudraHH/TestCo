import { useState, useEffect } from "react";
import ProfileCompletion from "./ProfileCompletion";

const ProfileCompletionParent = () => {
    const [userRole, setUserRole] = useState("admin");
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useEffect to initialize form data based on the selected user role
    useEffect(() => {
        const initializeFormData = () => {
            switch (userRole) {
                case 'student':
                    return {
                        email: "student@example.com",
                        firstName: "",
                        lastName: "",
                    };
                case 'instructor':
                    return {
                        email: "instructor@example.com",
                        username: "",
                        firstName: "",
                        lastName: "",
                        coursesTaught: "",
                        contactNumber: "",
                        gender: "",
                    };
                case 'admin':
                    return {
                        email: "admin@example.com",
                        adminCode: "",
                        firstName: "",
                        lastName: "",
                    };
                default:
                    return {};
            }
        };

        setFormData(initializeFormData());
    }, [userRole]); // re-run when userRole changes

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true);

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Profile submitted successfully!");
        }, 2000);
    };

    // This function switches between different roles
    const changeRole = (role) => {
        setUserRole(role);
    };

    return (
        <div className="App">
            <ProfileCompletion
                userRole={userRole}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default ProfileCompletionParent;
