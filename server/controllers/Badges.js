const badges = require("../models/badges")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const getUserBadges = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId).populate('badge').exec();

        if (!user) {
            return res.status(404).send('Badge Not Found');
        }

        const badgeCounts = user.badge.reduce((acc, badge) => {
            const badgeId = badge._id.toString();
            if (!acc[badgeId]) {
                acc[badgeId] = { badge, count: 0 };
            }
            acc[badgeId].count += 1;
            return acc;
        }, {});
        const badgeList = Object.values(badgeCounts);
        res.json(badgeList);

    }
    catch (error) {
        res.status(500).send('Error In Badges Controller');
    }
};

const createBadge = async (req, res) => {

    const { name, description } = req.body;
    try {
        const Image = req.files.Image;
        const Images = await uploadImageToCloudinary(
            Image,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const badge = new badges({
            name,
            description,
            Image: Images.secure_url,
        });

        await badge.save();
        res.status(201).send(badge);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error In Badge Creation');
    }
};

module.exports = {
    getUserBadges,
    createBadge
};