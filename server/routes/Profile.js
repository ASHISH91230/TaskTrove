const express = require("express")
const router = express.Router()
const { auth,isStudent } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledChallenges,
  studentDashboard,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile",auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Challenges
router.get("/getEnrolledChallenges", auth, getEnrolledChallenges)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/studentDashboard", auth, isStudent, studentDashboard)

module.exports = router