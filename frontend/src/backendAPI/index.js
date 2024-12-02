const backendDomain = "https://fe28-117-193-31-56.ngrok-free.app";

const backendApi = {
  signUp: {
    url: `${backendDomain}/api/sign-up`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/sign-in`,
    method: "POST",
  },
  signOut: {
    url: `${backendDomain}/api/sign-out`,
    method: "POST",
  },
  profileCompletion : {
    url: `${backendDomain}/api/profile-completion`,
    method: "POST",
  },

  currentUser: {
    url: `${backendDomain}/api/fetch-profile`,
    method: "POST",
  },



  
  // INSTRUCTOR SIDE

  addStudents: {
    url: `${backendDomain}/api/addStudents`,
    method: "POST",
  },

  createCodingAssessment: {
    url: `${backendDomain}/api/create-coding-assessment`,
    method: "POST",
  },

  createMCQAssessment:{
    url: `${backendDomain}/api/create-coding-assessment`,
    method: "POST",
  },

  codingAssessmentDataPull: {
    url: `${backendDomain}/api/coding-assessment-data-pull`,
    method: "GET",
  },

  mcqAssessmentDataPull: {
    url: `${backendDomain}/api/mcq-assessment-data-pull`,
    method: "GET",
  },
  

  //  STUDENT SIDE

  //      coding assessment evaluation
  codingAssessmentEvaluation: {
    url: `${backendDomain}/api/coding-assessment-evaluation`,
    method: "POST",
  },

  //      mcq assessment evaluation
  mcqAssessmentEvaluation: {
    url: `${backendDomain}/api/mcq-assessment-evaluation`,
    method: "POST",
  }

  
};

export default backendApi;
