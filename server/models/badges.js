const mongoose = require("mongoose");

const badgesSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true

   },
   description: {
      type: String,
       required: true
   },
   dateAwarded: {
      type: Date, default: Date.now
   },
   // dailyloginImage: {
   //    type: String,
   //    require: true,

   // },
   Image: {
      type: String,
      require: true,

   },
   // userId: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'User', required: true
   // },
   // streakId: {
   //    type: mongoose.Schema.Types.ObjectId,
   //    ref: 'streakDate',
   // }
})
module.exports = mongoose.model('badges', badgesSchema);