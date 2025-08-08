const mongoose=require('mongoose')
const qn_schema=new mongoose.Schema({
    quantity:Number,
    price:Number,
    month:Number,
})
const userschema=new mongoose.Schema({
    name:String,
    mail:String,
    pass:String,
    products:[String],
    ingridients:[String], 
    temporary:[],
    post:[String],
    bookmarks:[String],
    cart:[{product:String,quantity:Number}],
})
const User=mongoose.model('User',userschema)
module.exports=User