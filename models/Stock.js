const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types
const validator=require("validator")
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        require: true,
        ref:'Product'
    },
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLenght: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true
    },
  
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
        }
    },
    imageURLs: [{
        type: String,
        require: true,
        validate:[validator.isURL,"Please provide vaild url"]
    }],
    brand: {
        type: String,
        ref: "Brand",
        require: true,
    }


    , status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },
    price: {
        type: Number,
        require: true,
        min: [0, "Product price can't  be negatinve"]
    }
    , quantity: {
        type: Number,
        require: true,
        min: [0, "Product quantity can't  be negatinve"]
    }
    , categories: {
        name: {
            type: String,
            required: true
        },

    },

    store: {

        name: {
            type: String,
            trim: true,
            require: [true,
                "please provide a store name"
            ],
            enum: {
                values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur"],
                message: "{VALUE} is not a vaild name"
            },
            lowercase: true,
        },
        id: {
            type: ObjectId,
            require: true,
            ref: "Store"
        }
    },
    supplieBy:{
        name:{
            type:String,
            trim:true,
            require:[true,"please provide a supplier name"],
            
        },
        id:{
            type:ObjectId,
            ref:"Spplier"
        }
    },
    
         sellCount:{
            type:Number,
            default:0,
            min:0
         }
    


}, {
    timestamps: true,
})
// mongoose middlewares for saving data:pre/post;
// productSchema.pre('save',function(next){
//     console.log('Before saving data')
//     if(this.quantity==0){
//         this.status='out-of-stock'
//       }
//     next()
// })
// productSchema.post('save',function(doc,next){
//     console.log('affter saving data')
//     next()
// })

const Stock = mongoose.model('Stock', stockSchema)


module.exports = Stock;