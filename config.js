const BASE_URL = import.meta.env.NEXT_BACKEND_URL || "http://localhost:3000/api"; // Use environment variable for flexibility

const API = {
  // Auth & User
  SIGN_UP: `${BASE_URL}/signUp`,
  SIGN_IN: `${BASE_URL}/signIn`,
  GET_USER: `${BASE_URL}/getUser`,
  SIGN_OUT: `${BASE_URL}/signOut`,
  UPDATE_PASSWORD: `${BASE_URL}/updatePassword`,
  UPDATE_PROFILE: `${BASE_URL}/updateProfile`,
  FORGOT_PASSWORD: `${BASE_URL}/forgotPassword`,
  RESET_PASSWORD: `${BASE_URL}/resetPassword`,

  // Jobs
  POST_JOB: `${BASE_URL}/jobPost`,
  EMPLOYER_JOBS: `${BASE_URL}/employerJobs`,
  ALL_JOBS: `${BASE_URL}/jobList`,
  JOB_BY_ID: (id) => `${BASE_URL}/job/${id}`,
  DELETE_JOB: (id) => `${BASE_URL}/delete/${id}`,
  UPDATE_JOB: (id) => `${BASE_URL}/update/${id}`,

  // Applications
  POST_APPLICATION: `${BASE_URL}/postApplication`,
  EMPLOYER_APPLICATIONS: `${BASE_URL}/employer/getall`,
  JOB_SEEKER_APPLICATIONS: `${BASE_URL}/jobSeeker/getall`,
  DELETE_APPLICATION: (id) => `${BASE_URL}/jobSeekerDelete/${id}`,

  // Categories
  INSERT_CATEGORY: `${BASE_URL}/categoryInsert`,
  GET_ALL_CATEGORIES: `${BASE_URL}/getallCategory`,
  CATEGORY_BY_ID: (id) => `${BASE_URL}/getCategoryById/${id}`,
  CATEGORY_JOBS: (cName) => `${BASE_URL}/categoryJob/${cName}`,
  EMPLOYER_CATEGORIES: `${BASE_URL}/employerCategory`,
  DELETE_CATEGORY: (id) => `${BASE_URL}/deleteCategory/${id}`,
};

export default API;
