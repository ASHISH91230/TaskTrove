// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Task Controllers Import
const {
  createTask,
  getAlltasks,
  editTask,
  gettaskDetails,
  getStudentTask,
  deleteTask,
  getFullTaskDetails,
  addCategoryTask
} = require("../controllers/Task")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview")
const {
  updateTaskProgress,
} = require("../controllers/TaskProgress")
// Importing Middlewares
const { auth,isStudent} = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Task routes
// ********************************************************************************************************

// Tasks can Only be Created by Instructors
router.post("/createTask", auth, isStudent, createTask)
//Add a Section to a Course
router.post("/addSection", auth, isStudent, createSection)
// Update a Section
router.post("/updateSection", auth, isStudent, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isStudent, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isStudent, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isStudent, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isStudent, createSubSection)
// Get all Registered Tasks
router.get("/getAlltasks", getAlltasks)
router.post("/editTask", auth, isStudent, editTask)
// Get Details for a Specific Task
router.post("/gettaskDetails", gettaskDetails)
router.get("/getStudentTask",auth,isStudent,getStudentTask);
router.post("/updateTaskProgress", auth, isStudent, updateTaskProgress)
router.delete("/deleteTask",deleteTask);
router.post("/getFullTaskDetails", auth, getFullTaskDetails)
router.post("/addCategoryTask",auth,addCategoryTask)
// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here

router.post("/createCategory",auth, isStudent, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router