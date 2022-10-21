const mongoose= require("mongoose");
const validator=require("validator")
const {ObjectId}=mongoose.Schema.Types;
const storeSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:[true,
            "please provide a store name"
        ],
        enum:{
 values:["dhaka","chattogram","rajshahi","sylhet","khulna","barishal","rangpur"],
 message:"{VALUE} is not a vaild name"        
},
        lowercase:true,
    },
    description:{
        type:String,
    },
   
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"  
},
manager:{
    name:String,
    contactNumber:String,
    id:{
        type:ObjectId,
        ref:'User'
    }
}

},
{
    timestamps:true,}

)

const Store= mongoose.model("Store",storeSchema);

module.exports=Store;