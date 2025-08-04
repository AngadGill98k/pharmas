const mongoose = require('mongoose');

const replieschema = new mongoose.Schema({
    user:String,
    reply:String,
    like:Number,
})
const postschema = new mongoose.Schema({
  user:String,
  question:String,
  description:String,
  category:String,
  replies:[],
  like:Number,
  bookmarked:Number
});

module.exports = mongoose.model('Posts', postschema);