// const { streakDate, User, badges } = require('./models');
const streakDate= require('../models/streakDate')
const User = require("../models/User")
const mongoose = require('mongoose');
const badges= require("../models/badges")
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
            streak= await streakDate.create({userId:userId,currentStreak:1})
          
        }
        console.log(streak)
        const today = new Date();
        const lastLoginDate = new Date(streak.lastLoginDate);
        const daysSinceLastLogin = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
        if (daysSinceLastLogin === 0) {
            return res.json({ message: 'Already logged in today', currentStreak: streak.currentStreak });
          
        }
        else if (daysSinceLastLogin === 1) {
            streak.currentStreak += 1;
            const badge = await badge.find({
                name:"daily login"
                
            })
            user.badge.push(badge._id);
            if (streak.currentStreak >= 75) {
                streak.completed = true;
                const badge75 = await badge.find({
                    name:"75 Day Hard Challenege"
                })
                user.badge.push(badge._id)
                // await badge.save();
               
            }
        }
        else {
            streak.currentStreak = 1;
            streak.startDate = today;
        }
        streak.lastLoginDate = today;
        await streak.save();
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