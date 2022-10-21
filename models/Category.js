const mongoose=require("mongoose");
const validator =require("validator");
const{ObjectId}=mongoose.Schema.Types;




const categorySchema=mongoose.Schema({
name:{
    type:String,
    trim:true,
    require:[true,"please provide a category name"]
    , lowercase:true,
    unique:true,
},
decription:String,

imageUrl:{
    type:String,
    validate:[validator.isURL,"please provid a valid URL"]
}


},{
    timestamps:true,
})

const Category=mongoose.model('Category',categorySchema);
module.exports=Category;