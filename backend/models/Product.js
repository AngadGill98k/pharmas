const mongoose=require('mongoose')

const qn_schema=new mongoose.Schema({
    quantity:Number,
    price:Number,
    month:Number,
})
const secondary=new mongoose.Schema({
    text:String,
    image:String,
})
const duration=new mongoose.Schema({
    text:String,
    image:String,
})
const dosage=new mongoose.Schema({
    text:String,
    image:String,
})
const usage=new mongoose.Schema({
    text:String,
    image:String,
})
const faqs=new mongoose.Schema({
    question:String,
    answer:String,
})
const additionalDisplay=new mongoose.Schema({
    name:String,
    image:String,
})
const productschema=new mongoose.Schema({
    user:String,
    name:String,
    description:String,
    quantities:[qn_schema],
    subtitle:String,
    thumbnail:String,
    images:[String],
    primary_benefits:[String],
    secondary_benefits:[secondary],
    primaryIngredients:[String],
    allIngredients:[String],
    duration:[duration],
    usage:[usage],
    dosage:[dosage],
    faqs:[faqs],
    title:String,////neeed to do this
    additionalDisplay:[additionalDisplay],
    status:{type:Boolean,default:true},

})
const Product=mongoose.model('product',productschema)
module.exports=Product