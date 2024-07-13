const Section = require("../models/Section");
const Task = require("../models/Task")
const SubSection = require("../models/SubSection")
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, taskId } = req.body;

		// Validate the input
		if (!sectionName || !taskId) {
			return res.status(400).json({
				success: false,
				message: "Missing Required Properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the task's content array
		const updatedTask = await Task.findByIdAndUpdate(
			taskId,
			{
				$push: {
					taskContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated task object in the response
		res.status(200).json({
			success: true,
			message: "Section Created Successfully",
			updatedTask,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, taskId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const task = await Task.findById(taskId)
			.populate({
				path: "taskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
		res.status(200).json({
			success: true,
			message: section,
			data: task,
		});
	} catch (error) {
		console.error("Error Updating Section:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {

		const { sectionId, taskId } = req.body;
		await Task.findByIdAndUpdate(taskId, {
			$pull: {
				taskContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		if (!section) {
			return res.status(404).json({
				success: false,
				message: "Section Not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({ _id: { $in: section.subSection } });

		await Section.findByIdAndDelete(sectionId);

		//find the updated task and return
		const task = await Task.findById(taskId).populate({
			path: "taskContent",
			populate: {
				path: "subSection"
			}
		})
			.exec();

		res.status(200).json({
			success: true,
			message: "Section Deleted",
			data: task
		});
	} catch (error) {
		console.error("Error Deleting Section:", error);
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};