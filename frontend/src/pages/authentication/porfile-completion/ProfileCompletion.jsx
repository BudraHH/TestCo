import StudentProfileCompletion from "./components/StudentProfileCompletion.jsx";
import InstructorProfileCompletion from "./components/InstructorProfileCompletion.jsx";
import AdminProfileCompletion from "./components/AdminProfileCompletion.jsx";

const ProfileCompletion = ({ userRole, formData, handleInputChange, handleSubmit, isSubmitting }) => {
  
  switch (userRole) {
    case 'student':
      return (
        <StudentProfileCompletion
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    case 'instructor':
      return (
        <InstructorProfileCompletion
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      );
    case 'admin':
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
