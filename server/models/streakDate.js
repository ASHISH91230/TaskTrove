const mongoose = require("mongoose");

const streakDateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        lastLoginDate: {
            type: Date,
            default: Date.now
        },
        currentStreak: {
            type: Number,
            default: 1
        },
        dailylogin:{
            type: Number,
            default: 0
        },
        completed: {
            type: Boolean,
            default: false
        },
    }
);

module.exports = mongoose.model("streakDate",streakDateSchema);