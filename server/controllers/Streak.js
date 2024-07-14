const streakDate = require('../models/streakDate')
const User = require("../models/User")
const mongoose = require('mongoose');
const { getDateDifference } = require("../utils/getDateDifference");
const DAILY_LOGIN_BADGE_ID = new mongoose.Types.ObjectId("666330eeb48700df183c1648"); // Replace with your actual badge ID
const HARD_CHALLENGE_BADGE_ID = new mongoose.Types.ObjectId("666331b5c3335a5ab6f9fa69"); // Replace with your actual badge ID

const addstreak = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        let streak = await streakDate.findOne({ userId, completed: false });

        if (!streak) {
            streak = await streakDate.create({ userId })
        }

        const today = new Date();

        if (!user.badge.includes(DAILY_LOGIN_BADGE_ID)) {
            user.badge.push(DAILY_LOGIN_BADGE_ID);
            await user.save();  // Save the user after updating the badges
        }

        const lastLoginDate = new Date(streak.lastLoginDate);

        const daysSinceLastLogin = getDateDifference(today, lastLoginDate)

        if (daysSinceLastLogin === 0) {
            return res.json({ message: 'Already Logged In Today', streak: streak });
        }
        else if (daysSinceLastLogin === 1) {
            streak.currentStreak += 1;
            user.badge.push(DAILY_LOGIN_BADGE_ID);
            if (streak.currentStreak >= 75) {
                streak.completed = true;
                user.badge.push(HARD_CHALLENGE_BADGE_ID);
            }
        }
        else {
            streak.currentStreak = 1;
            streak.startDate = today;
        }
        streak.lastLoginDate = today;
        await streak.save();
        await user.save();
        return res.json({ message: 'Welcome Back', streak: streak });
    }
    catch (error) {
        res.status(500).send('Streak Controller Error');
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