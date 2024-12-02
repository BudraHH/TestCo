import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppProvider } from "./context/index.jsx";

// LANDING PAGE
import LandingPage from "./pages/landing/LandingPage.jsx";

// AUTHENTICATION ROUTES
import SignIn from "./pages/authentication/SignIn.jsx";
import SignUpPage from "./pages/authentication/SignUpPage.jsx";
import AccountRecoveryPage from "./pages/authentication/AccountRecovery.jsx";
import NeedHelp from "./pages/authentication/NeedHelp.jsx";
import ProfileCompletionParent from "./pages/authentication/porfile-completion/ProfileCompletionParent.jsx";

// SUPER ADMIN ROUTES
import SuperAdmin from "./pages/views/super-admin/SuperAdmin.jsx";
import SuperAdminDashboard from "./pages/views/super-admin/pages/SuperAdminDashboard.jsx";
import SuperAdminUserManagement from "./pages/views/super-admin/pages/SuperAdminUserManagement.jsx";
import SuperAdminAssessmentsInfo from "./pages/views/super-admin/pages/assessments/SuperAdminAssessments.jsx";
import SuperAdminSettings from "./pages/views/super-admin/pages/settings/SuperAdminSettings.jsx";

// INSTRUCTOR ROUTES
import Instructor from "./pages/views/instructor/Instructor.jsx";
import InstructorHome from "./pages/views/instructor/pages/InstructorHome.jsx";
import InstructorAssessmentsInfo from "./pages/views/instructor/pages/assessments/InstructorAssessmentsInfo.jsx";
import InstructorAddNewAssessment from "./pages/views/instructor/pages/assessments/add-assessments/InstructorAddNewAssessment.jsx";
import InstructorAddNewAssessmentType from "./pages/views/instructor/pages/assessments/add-assessments/InstructorAddNewAssessmentType.jsx";
import InstructorStudentsDetails from "./pages/views/instructor/pages/students-details/InstructorStudentsDetails.jsx";
import InstructorSingleStudentDetails from "./pages/views/instructor/pages/students-details/InstructorSingleStudentDetails.jsx";
import InstructorSettings from "./pages/views/instructor/pages/settings/InstructorSettings.jsx";

// STUDENT ROUTES
import Student from "./pages/views/student/Student.jsx";
import StudentHome from "./pages/views/student/pages/StudentHome.jsx";
import StudentAssessmentsInfo from "./pages/views/student/pages/assessment-pages/StudentAssessmentInfo.jsx";
import StudentSingleAssessmentDetails from "./pages/views/student/pages/assessment-pages/StudentSingleAssessmentDetails.jsx";
import SystemCheck from "./pages/views/student/pages/assessment/SystemCheck.jsx";

import CodingAssessment from "./pages/views/student/pages/assessment-pages/take-assessments/assessment-ui/CodingAssessment.jsx";
import MCQAssessment from "./pages/views/student/pages/assessment-pages/take-assessments/assessment-ui/MCQAssessment.jsx";
import InstructorAddNewStudent from "./pages/views/instructor/pages/students-details/InstructorAddNewStudent.jsx";

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.user?.user?.email);

  return (
      <AppProvider>
        <ToastContainer />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Authentication Routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<AccountRecoveryPage />} />
            <Route path="/need-help" element={<NeedHelp />} />
            <Route path="/profile-completion/:role" element={<ProfileCompletionParent />} />
            {/* Super Admin Routes */}
            {isAuthenticated && (
                <Route path="/super-admin" element={<SuperAdmin />}>
                  <Route path="dashboard" element={<SuperAdminDashboard />} />
                  <Route path="user-management" element={<SuperAdminUserManagement />} />
                  <Route path="assessments" element={<SuperAdminAssessmentsInfo />} />
                  <Route path="settings" element={<SuperAdminSettings />} />
                </Route>
            )}
            {/* Instructor Routes */}
            {isAuthenticated && (
                <Route path="/instructor" element={<Instructor />}>
                  <Route path="home" element={<InstructorHome />} />
                  <Route path="assessments" element={<InstructorAssessmentsInfo />} />
                  <Route path="assessments/add-new-assessment" element={<InstructorAddNewAssessment />}>
                    <Route path=":assessmentType" element={<InstructorAddNewAssessmentType />} />
                  </Route>
                  <Route path="students-details" element={<InstructorStudentsDetails />} />
                  <Route path="students-details/student" element={<InstructorSingleStudentDetails />} />
                  <Route path="students-details/add-new-student" element={<InstructorAddNewStudent />} />
                  <Route path="account-settings" element={<InstructorSettings />} />
                </Route>
            )}
            {/* Student Routes */}
            {isAuthenticated && (
                <Route path="/student" element={<Student />}>
                  <Route path={`home`} element={<StudentHome />} />
                  <Route path={`my-assessments`} element={<StudentAssessmentsInfo />} />
                  <Route path="/student/assessment/:id" element={<StudentSingleAssessmentDetails />} />
                </Route>
            )}
            <Route path="/student/start-test/:assessmentId" element={<SystemCheck />} />
            <Route path="code-test" element={<CodingAssessment />} />
            <Route path="mcq-assessment" element={<MCQAssessment />} />
          </Routes>
        </main>
      </AppProvider>
  );
};

export default App;
