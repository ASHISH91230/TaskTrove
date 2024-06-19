const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ success: false, message: "All Fields Are Required" });
        }
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",

        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }
};


exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {},
            { name: true, description: true }
        ).populate({
            path: "Taskes",
            match: { status: "Published" },
            populate: "ratingAndReviews",
        })
            .exec();
        res.status(200).json({
            success: true,
            data: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const { categoryId } = req.body;
        //get taskes for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "Taskes",
                populate: {
                    path: "taskContent"
                },
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category Not Found',
            });
        }
        // Handle the case when there are no tasks
        if (selectedCategory.Taskes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Tasks Found For The Selected Category.",
            })
        }
        selectedCategory.Taskes = selectedCategory.Taskes.filter(task => task.taskContent.length >= 5);
        //get tasks for different categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
                ._id
        )
            .populate({
                path: "Taskes",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()
        differentCategory.Taskes = differentCategory.Taskes.filter(task => task.taskContent.length >= 5);
        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
            },
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}