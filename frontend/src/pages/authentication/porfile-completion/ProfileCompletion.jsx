import StudentProfileCompletion from "./components/StudentProfileCompletion.jsx";
import InstructorProfileCompletion from "./components/InstructorProfileCompletion.jsx";
import AdminProfileCompletion from "./components/AdminProfileCompletion.jsx";

const ProfileCompletion = ({ userRole, formData, handleInputChange, handleSubmit, isSubmitting }) => {
  // console.log("entered profile completion with role : >> ", userRole);
  switch (userRole) {
    case 'Student':
      return (
        <StudentProfileCompletion
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    case 'Instructor':
      return (
        <InstructorProfileCompletion
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    case 'Admin':
      return (
        <AdminProfileCompletion
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    default:
      return null;
  }
};

export default ProfileCompletion
