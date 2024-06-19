const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_CHALLENGES_API: BASE_URL + "/profile/getEnrolledChallenges",
  GET_STUDENT_DATA_API: BASE_URL + "/profile/studentDashboard",
}

// TASK ENDPOINTS
export const taskEndpoints = {
  GET_ALL_TASK_API: BASE_URL + "/Task/getAlltasks",
  TASK_DETAILS_API: BASE_URL + "/Task/gettaskDetails",
  EDIT_TASK_API: BASE_URL + "/Task/editTask",
  TASK_CATEGORIES_API: BASE_URL + "/Task/showAllCategories",
  CREATE_TASK_API: BASE_URL + "/Task/createTask",
  CREATE_SECTION_API: BASE_URL + "/Task/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/Task/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/Task/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/Task/updateSubSection",
  GET_ALL_STUDENT_TASK_API: BASE_URL + "/Task/getStudentTask",
  DELETE_SECTION_API: BASE_URL + "/Task/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/Task/deleteSubSection",
  DELETE_TASK_API: BASE_URL + "/Task/deleteTask",
  GET_FULL_TASK_DETAILS_AUTHENTICATED: BASE_URL + "/Task/getFullTaskDetails",
  CREATE_CATEGORY_TASK: BASE_URL + "/Task/addCategoryTask",
  SUBSECTION_COMPLETION_API: BASE_URL + "/Task/updateTaskProgress",
  CREATE_RATING_API: BASE_URL + "/Task/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/Task/getReviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/Task/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/Task/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}