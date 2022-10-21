const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLenght: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true
    },
    // price: {
    //   type: Number,
    //   rquired: true,
    //   min: [0, "Price can't be negative"],
    // },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs","bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag"
      }
    },
    imageURLs:[{
      type:String,
      require:true,
      validate:{
        validator:(value)=>{

          if(Array.isArray(value)){
            return false;
          }
          let isValid=true
          value.forEach(url=>{
   
            if(!validator.isURl(url)){
              isValid =flase
            }

          })
          return isValid
        },
        massage:"please provid valid image urls"
      }
    }],
    brand:{
     type:String,
     ref:"Brand",
     require:true,
    }
    // quantity: {
    //   type: Number,
    //   required: true,
    //   min: [0, "quantity cant be negative"],
    //   validate: {
    //     validator: (value) => {
    //       const isInteger = Number.isInteger(value);
    //       if (isInteger) {
    //         return true
    //       } else {
    //         return false
    //       }
    //     }
    //   },
    //   message: "Qunatity must be an integer"
    // },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: {
    //     values: ["in-stock", "out-of-stock", "discontinued"],
    //     message: "status can't be {VALUE}"
    //   }
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   detfault: Date.now
    // }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
  ,  categories: [{
      name: {
        type: String,
        required: true
      },
      _id: mongoose.Schema.Types.ObjectId
    }]
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

// productSchema.methods.logger=function(){
//     console.log(`data saved for ${this.name}`)
// }

// schima -> model -> query

const Proudct =mongoose.model('Product',productSchema)


module.exports=Proudct;