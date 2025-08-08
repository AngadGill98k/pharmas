const mongoose=require('mongoose')
const benefitschema=new mongoose.Schema({
    text:String,
    image:String
})
const plantPartschema=new mongoose.Schema({
    part:String,
    description:String
})
const inchema=new mongoose.Schema({
    user:String,
    name:String,
    scientific_name:String,
    sanskrit_name:String,
    uses:[String],
    vata:String,
    kapha:String,
    v_reason:String,
    k_reason:String,
    benefits:[benefitschema],
    rasa:String,
    veerya:String,
    guna:String,
    vipaka:String,
    formulations:[benefitschema],
    therapeutic_uses:[benefitschema],
    plantParts:[plantPartschema],
    description:String,
    image:[String],
    combinedWith:String,
    geographicalLocations:String,
    status:{type:Boolean,default:true},
    
})
const Ingridients=mongoose.model('Ingridients',inchema)
module.exports=Ingridients