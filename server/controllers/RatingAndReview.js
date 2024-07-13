const RatingAndReview = require("../models/RatingAndReview");
const Task = require("../models/Task");
const { mongo, default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try {

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const { rating, review, taskId } = req.body;
        //check if user is enrolled or not
        const taskDetails = await Task.findOne(
            {
                _id: taskId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            });

        if (!taskDetails) {
            return res.status(404).json({
                success: false,
                message: 'User Is Not Enrolled In The Task',
            });
        }
        //check if user already reviewed the task
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            task: taskId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Task Is Already Reviewed By The User',
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review,
            task: taskId,
            user: userId,
        });

        //update task with this rating/review
        const updatedTaskDetails = await Task.findByIdAndUpdate({ _id: taskId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true });
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating And Review Created Successfully",
            ratingReview,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get task ID
        const taskId = req.body.taskId;
        //calculate avg rating

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    task: new mongoose.Types.ObjectId(taskId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ])

        //return rating
        if (result.length > 0) {

            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })

        }

        //if no rating/Review exist
        return res.status(200).json({
            success: true,
            message: 'Average Rating Is 0, No Ratings Given Till Now',
            averageRating: 0,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "task",
                select: "taskName",
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "All Reviews Fetched Successfully",
            data: allReviews,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}