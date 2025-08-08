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
  like:[String],
  bookmarked:Number,
  date:{type: Date, default: Date.now},
});

const Posts= mongoose.model('Posts', postschema);
module.exports = Posts