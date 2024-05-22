const mongoose = require("mongoose");

const badgesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    description: {
         type: String, required: true
         },
  dateAwarded: {
     type: Date, default: Date.now
     },
  userId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', required: true
     },
     streakId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'streakDate', required: true
     }
})
module.exports = mongoose.model('badges', badgesSchema);