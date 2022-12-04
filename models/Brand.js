const mongoose= require("mongoose");
const validator=require("validator")
const {ObjectId}=mongoose.Schema.Types;

const brandSchema=mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "Proudct"
      }],
   
    name:{
        type:String,
        trim:true,
        require:[true,
            "please provide a brand name"
        ],
        maxLength:100,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
    },
    email:{
    type:String,
    lowercase:true,
    validate:[validator.isEmail,"please provide a vaild email"]
    },
    website:{
        type:String,
        validate:[validator.isURL,"please provide a valid url"]
    },

    location:{
        type:String,
    },

    

 suppliers:[{

    id:{
        type:ObjectId,
        ref:"supplier"
    }
 }],
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"  
},


},
{
    timestamps:true,}

)

const Brand= mongoose.model("Brand",brandSchema);

module.exports=Brand;