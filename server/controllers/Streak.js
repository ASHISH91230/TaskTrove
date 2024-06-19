// const { streakDate, User, badges } = require('./models');
const streakDate= require('../models/streakDate')
const User = require("../models/User")
const mongoose = require('mongoose');
const badges= require("../models/badges")


const DAILY_LOGIN_BADGE_ID = new mongoose.Types.ObjectId("666330eeb48700df183c1648"); // Replace with your actual badge ID
const HARD_CHALLENGE_BADGE_ID = new mongoose.Types.ObjectId("666331b5c3335a5ab6f9fa69"); // Replace with your actual badge ID

const addstreak = async (req, res) => {
    const { userId } = req.body;
    console.log("userId",userId);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let streak = await streakDate.findOne({ userId, completed: false });
        if (!streak) {
            // streak = new streakDate({ userId });
            console.log("abchc")
            streak= await streakDate.create({userId})
        }
        console.log(streak)
        const today = new Date();


        if (!user.badge.includes(DAILY_LOGIN_BADGE_ID)) {
            user.badge.push(DAILY_LOGIN_BADGE_ID);
            await user.save();  // Save the user after updating the badges
        }
        // else{
        //     console.log("cannot get inside userbadge")
        // }





        const lastLoginDate = new Date(streak.lastLoginDate);
        const daysSinceLastLogin = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
        if (daysSinceLastLogin === 0) {
            return res.json({ message: 'Already logged in today', currentStreak: streak.currentStreak });
          
        }
        else if (daysSinceLastLogin === 1) {
            streak.currentStreak += 1;
            // const badge = await badges.findOne({
            //     name:"daily login"
                
            // })
            //  const dailyLoginBadge = await badges.findOne({name:"dailylogin"});
            //  console.log("dailyLOGINBADGE",dailyLoginBadge);
            //  if(dailyLoginBadge && !user.badge.includes(dailyLoginBadge._id)){
            //     user.badge.push(dailyLoginBadge._id);
            //  }


            if (!user.badge.includes(DAILY_LOGIN_BADGE_ID)) {
                user.badge.push(DAILY_LOGIN_BADGE_ID);
            }





            
            if (streak.currentStreak >= 75) {
                streak.completed = true;
                // const badge75 = await badges.find({
                //     name:"75 Day Hard Challenege"
                // });
                // if(badge75 && !user.badge.includes(badge75._id)){
                //     user.badge.push(badge75._id);
                // }


                if (!user.badge.includes(HARD_CHALLENGE_BADGE_ID)) {
                    user.badge.push(HARD_CHALLENGE_BADGE_ID);
                }


                
                
                // user.badges.push(badge._id);
                // await user.save();
            }
        }
        else {
            streak.currentStreak = 1;
            streak.startDate = today;
        }
        streak.lastLoginDate = today;
        await streak.save();
        await user.save();
        res.send(`Current streak: ${streak.currentStreak} days`);
    }
    catch (error) {
        res.status(500).send('streak controller  error');
      }
};

const resetStreaks = async () => {
    const today = new Date();
    const streaks = await streakDate.find({ completed: false });
  
    for (const streak of streaks) {
      const lastLoginDate = new Date(streak.lastLoginDate);
      const daysSinceLastLogin = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
  
      if (daysSinceLastLogin > 1) {
        streak.currentStreak = 0;
        streak.startDate = today;
        streak.lastLoginDate = today;
        await streak.save();
      }
    }
  };
  module.exports = {
    addstreak,
    resetStreaks
  };