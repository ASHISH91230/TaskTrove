const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const ChallengesProgress = require("../models/ChallengesProgress");
const Task = require("../models/Task")
const { convertSecondsToDuration } = require("../utils/convertSeconds")
const mongoose = require("mongoose")
// Method for updating a profile
exports.updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber = "", gender = "", firstName = "", lastName = "" } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id).populate("additionalDetails");
		const profileId = userDetails.additionalDetails._id;
		const profileDetails = await Profile.findById(profileId);
		// Update the profile fields

		profileDetails.dateOfBirth = dateOfBirth;
		profileDetails.about = about;
		profileDetails.contactNumber = contactNumber;
		profileDetails.gender = gender;
		// Save the updated profile
		await profileDetails.save();
		userDetails.additionalDetails.dateOfBirth = dateOfBirth;
		userDetails.additionalDetails.about = about;
		userDetails.additionalDetails.contactNumber = contactNumber;
		userDetails.additionalDetails.gender = gender;
		userDetails.firstName = firstName;
		userDetails.lastName = lastName;
		await userDetails.save();
		return res.json({
			success: true,
			message: "Profile Updated Successfully",
			userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

exports.deleteAccount = async (req, res) => {
	try {
		const id = req.user.id;
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User Not Found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({
			_id: new mongoose.Types.ObjectId(user.additionalDetails),
		})
		for (const taskId of user.enrolledChallenges) {
			await Task.findByIdAndUpdate(
			  taskId,
			  { $pull: { studentsEnrolled: id } },
			  { new: true }
			)
		  }
		// Now Delete User
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User Deleted Successfully",
		});
		await ChallengesProgress.deleteMany({ userId: id })
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot Be Deleted" });
	}
};

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data Fetched Successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageToCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log(image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated Successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.getEnrolledChallenges = async (req, res) => {
	try {
		const userId = req.user.id
		let userDetails = await User.findOne({
			_id: userId,
		})
			.populate({
				path: "enrolledChallenges",
				populate: {
					path: "taskContent",
					populate: {
						path: "subSection",
					},
				},
			})
			.exec()
		const arr = []
		const progress = []
		let c = 0;
		let d = 0;
		userDetails = userDetails.toObject()
		var SubsectionLength = 0
		for (var i = 0; i < userDetails.enrolledChallenges.length; i++) {
			let totalDurationInSeconds = 0
			SubsectionLength = 0
			for (var j = 0; j < userDetails.enrolledChallenges[i].taskContent.length; j++) {
				totalDurationInSeconds += userDetails.enrolledChallenges[i].taskContent[
					j
				].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
				SubsectionLength +=
					userDetails.enrolledChallenges[i].taskContent[j].subSection.length
			}
			const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
			arr[c++] = totalDuration
			let taskProgressCount = await ChallengesProgress.findOne({
				challengeId: userDetails.enrolledChallenges[i]._id,
				userId: userId,
			})
			taskProgressCount = taskProgressCount?.completedSubsection.length
			if (SubsectionLength === 0) {
				progress[d++] = 100
			} else {
				// To make it up to 2 decimal point
				const multiplier = Math.pow(10, 2)
				progress[d++] =
					Math.round(
						(taskProgressCount / SubsectionLength) * 100 * multiplier
					) / multiplier
			}
		}
		if (!userDetails) {
			return res.status(400).json({
				success: false,
				message: `Could Not Find User With Id: ${userDetails}`,
			})
		}
		return res.status(200).json({
			success: true,
			data: { userDetails, arr, progress }
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};

exports.studentDashboard = async (req, res) => {
	try {
		let arr = []
		let c = 0
		let complete = 0
		let incomplete = 0
		let partial = 0
		let progress = []
		let d = 0
		const taskDetails = await Task.find({ instructor: req.user.id }).populate({
			path: "taskContent",
			populate: {
				path: "subSection",
			},
		})
		taskDetails.forEach((t) => {
			let count = 0
			t.taskContent.forEach((val) => {
				count += val.subSection.length
			})
			arr[c++] = count
		})
		c = 0
		for (var i = 0; i < taskDetails.length; i++) {
			const challengeProg = await ChallengesProgress.find({ challengeId: taskDetails[i]._id })
			if (challengeProg.length === 0) {
				incomplete++;
				c++;
				progress[d++] = 0
			}
			challengeProg.forEach((x) => {
				if (x.completedSubsection.length === arr[c]) {
					complete++
					progress[d++] = 100
				}
				else {
					partial++
					progress[d++] = x.completedSubsection.length / arr[c] * 100
				}
				c++
			})
		}
		const completedTasks = complete
		const incompletedTasks = incomplete
		const partialTasks = partial
		res.status(200).json({
			tasks: {
				taskDetails, completedTasks,
				incompletedTasks,
				partialTasks, progress
			}
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Server Error" })
	}
}