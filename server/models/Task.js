const mongoose = require("mongoose");

// Define the task schema
const TaskSchema = new mongoose.Schema({
	taskName: { type: String },
	taskDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	whatYouWillLearn: {
		type: String,
	},
	taskContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

// Export the task model
module.exports = mongoose.model("Task", TaskSchema);