const { streakDate, User, badges } = require('./models');
const mongoose = require('mongoose');

const login = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let streak = await streakDate.findOne({ userId, completed: false });
        if (!streak) {
            streak = new streakDate({ userId });
        }
        const today = new Date();
        const lastLoginDate = new Date(streak.lastLoginDate);
        const daysSinceLastLogin = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
        if (daysSinceLastLogin === 0) {
            return res.send('Already logged in today');

        }
        else if (daysSinceLastLogin === 1) {
            streak.currentStreak += 1;
            if (streak.currentStreak >= 75) {
                streak.completed = true;
                const badge = new badges({
                    name: "75-day streak",
                    description: "Completed a 75-day streak",
                    userId: user._id
                });
                await badge.save();
                user.badges.push(badge._id);
                await user.save();
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
    login,
    resetStreaks
  };