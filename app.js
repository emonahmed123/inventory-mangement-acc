const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// schema design

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
    price: {
      type: Number,
      rquired: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs"
      }
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true
          } else {
            return false
          }
        }
      },
      message: "Qunatity must be an integer"
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}"
      }
    },
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
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }]
  }, {
    timestamps: true,
  })
// mongoose middlewares for saving data:pre/post;
productSchema.pre('save',function(next){
    console.log('Before saving data')
    if(this.quantity==0){
        this.status='out-of-stock'
      }
    next()
})
// productSchema.post('save',function(doc,next){
//     console.log('affter saving data')
//     next()
// })

productSchema.methods.logger=function(){
    console.log(`data saved for ${this.name}`)
}

// schima -> model -> query

const Proudct =mongoose.model('product',productSchema)


app.post('/api/v1/product',async(req,res,next)=>{
 
    // try{
    //     const product =new Proudct(req.body)
    //     const result=await product.save()
    //     res.status(200).json({
    //       staus:'success',
    //       message:"data insert ",
    //       data:result
    //     })
    // }
    // catch(error){
    //    res.status(400).json({
    //     staus:"fail",
    //      message:'data is not '
    //    ,  error:error.message
    //     })
    // }


 try{
  const product= new Proudct(req.body);

  const result =await product.save();
  result.logger()
  res.status(200).json({
    staus:{success:true},
    message:'Product insert ',
    data:result,

  })

 }
catch(error)
{
 res.status(400).json({
    staus:{success:false},
    message:'product not insert',
    error:error.message
 })
}

})

app.get('/api/v1/product',async(req,res,next)=>{
    try{
     const products =await Proudct.find({}).select({name:1});
     //.limit()
    // name:{$in:["emon","apple"]}
     //quantity:{$gte:100}
     //  $or:[{_id:"631e995dc15defac5bab31e1"},{name:"jkhgkjh"}

     res.status(200).json({
        staus:'succes',
        data:products
     })
    }

    catch(error){
      res.status(400).json({
        staus:'fail',
        message:'can,t get data',
        error:error.message
      })
    }
})


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;