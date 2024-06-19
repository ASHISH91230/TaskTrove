// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

const { auth, isStudent } = require("../middlewares/auth")


// //adding routes for streak--------------------------->AKG
// const{
//   addStreak,
//   resetStreak
// }=require('../controllers/Streak')


// const {
//   getUserBadges,
//     createBadge
// }=require('../controllers/Badges')



// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************



// // streak ke liye --------->AKG
// router.post('/addStreak',auth,isStudent,addStreak)
// router.post('/resetStreak',auth,isStudent,resetStreak)

// //badges ke liye-------------->AKG
// router.post('/createBadge',auth,isStudent,createBadge)
// router.get('/getUserBadges',auth,isStudent,getUserBadges)

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router