const mongoose = require("mongoose");

const ChallengesProgress = new mongoose.Schema({

///check for challnegeid or taskid?

	challengeID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Task",
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	  },
	completedSubsection: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "SubSection",
		},
	],
});

module.exports = mongoose.model("ChallengesProgress", ChallengesProgress);