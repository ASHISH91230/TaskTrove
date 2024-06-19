const express =require("express")
const router = express.Router()
const {auth,isStudent}= require("../middlewares/auth")
const {
    getUserBadges,
    createBadge,
}=require("../controllers/Badges")
router.post("/getUserBadges",auth,isStudent,getUserBadges)
router.post("/createBadge",auth,isStudent,createBadge)
module.exports = router