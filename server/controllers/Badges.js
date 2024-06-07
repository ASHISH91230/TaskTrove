const badges = require("../models/badges")
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const getUserBadges = async(req, res)=>{
    const {userId} = req.body;
    console.log("ksdbjvkejbvksjdbvksdb",userId)
    try{
        const user = await User.findById(userId).populate("badge");
        console.log("usering badges",user.badge)
        console.log("usering badges",user)
        if(!user){
            return res.status(404).send('Badges not found');
        }
        res.json(user.badge.Image);

    }
    catch(error){
        res.status(500).send('error in badges controller');
    }
};

const createBadge = async(req,res)=>{
  
        const {  name, description } = req.body;
        try {
            // const user = await User.findById(userId);
            // if (!user) {
            //     console.log("userin createbadges",user)
            //     return res.status(404).send('User not found');
            // }
    
            const Image = req.files.Image;
            // const dailyloginImage = req.files.dailyloginImage;
    
            // Assuming uploadImageToCloudinary handles one image at a time
            const Images = await uploadImageToCloudinary(
                Image,
                process.env.FOLDER_NAME,
                1000,
                1000
            );
    
            // const dailyloginImageUrl = await uploadImageToCloudinary(
            //     dailyloginImage,
            //     process.env.FOLDER_NAME,
            //     1000,
            //     1000
            // );
    
            console.log("Images URL", Images);
            // console.log("DailyLoginImage URL", dailyloginImageUrl);
    
            const badge = new badges({
                name,
                description,
                // userId,
                Image: Images.secure_url,
                // dailyloginImage: dailyloginImageUrl.secure_url,
            });
    
            await badge.save();
            console.log("idddddddddddddd",badge._id);
            // user.badge.push(badge._id);

            // await user.save();
            res.status(201).send(badge);
        } catch (error) {
            console.error(error); // Log the actual error for debugging
            res.status(500).send('Error in badge creation');
        }
    };


module.exports = {
    getUserBadges,
    createBadge
  };