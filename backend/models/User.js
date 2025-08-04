const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    name:String,
    mail:String,
    pass:String,
    products:[String],
    ingridients:[String], 
    temporary:[],
    post:[String],
    bookmarks:[String]
})
const User=mongoose.model('User',userschema)
module.exports=User