const { badges , User}= require('./models');
const getUserBadges = async(req, res)=>{
    const {userId} = req.param;
    try{
        const badge = await badges.find({userId});
        if(!badge){
            return res.status(404).send('Badges not found');
        }
        res.json(badges);

    }
    catch(error){
        res.status(500).send('error in badges controller,getuserbadge');
    }
};

const createBadge = async(req,res)=>{
    const {userId, name , description}=req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).send('User not found');
        }
        const Badge = new badges({
            name,
            description,
            userId
        });
        await Badge.save();
        user.badge.push(Badge._id);
        await user.save();
        res.status(201).send(Badge);

    }
    catch(error){
        res.status(500).send('error in badges controller,create badge');
    }
};

module.exports = {
    getUserBadges,
    createBadge
  };