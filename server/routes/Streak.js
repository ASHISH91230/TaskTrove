const express =require("express")
const router = express.Router()
const { auth,isStudent } = require("../middlewares/auth")
const{
    addstreak,
    resetStreaks,
}=require("../controllers/Streak");

const {
    getUserBadges,
    createBadge,
}=require("../controllers/Badges")
router.post("/getUserBadges",auth,isStudent,getUserBadges)
router.post("/createBadge",auth,isStudent,createBadge)

router.post("/addstreak",auth,isStudent,addstreak)
router.post("/resetStreaks",auth,isStudent,resetStreaks)
module.exports = router