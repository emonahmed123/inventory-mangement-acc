const Product =require('../models/Product')
// const Data = require('./Data/data.json')
const{getProductService,createProductService,updateProductBYid,createBulkProductService, bulkUpdateProduct,deletProductBYid,bulkDeletProduct}=require("../service/product.service");





exports.getProducts=async(req,res,next)=>{
    try{
    //  cons t products =  await Proudct.where("name").where("quantity").gt(100).limit(2).sort({quantity:-1})
         let filters ={...req.query}    
         const queries ={}
         const excludeFields=['sort','page','limit']
         excludeFields.forEach(field=>delete filters[field])
        // gt ,ltl,gte,lte

        let filtersString= JSON.stringify(filters)
        filtersString=  filtersString.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
        // console.log(filtersString)
       filters=JSON.parse(filtersString)
        
          
         if (req.query.sort){
        //  price, quantity
          const sortBy=req.query.sort.split(',').join(' ')
         queries.sortBy=sortBy
          console.log(sortBy)
         }

         if(req.query.fields){
          const fields=req.query.fields.split(',').join(' ') 
          queries.fields=fields;
         }



         if(req.query.page){
        
          const {page=1,limit=10}=req.query;
          // 50products
          //each page 10 product
          const skip =(page-1)*parseInt(limit);
          queries.skip=skip;
          queries.limit=parseInt(limit)
         }
     // sort ,page ,limit > exclude

  
      // console.log('orginal',req.query)
     
      const products =await getProductService(filters,queries)
     
      //find({}).select({name:1});
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
};




exports.CreateProduct= async(req,res,next)=>{
 
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
  const result =await  createProductService(req.body)
  
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

}

exports.CreateBulkProduct= async(req,res,next)=>{
 
 try{
   
  const result =await  createBulkProductService(Data)
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

}


exports.updateProductBYId=async(req,res,next)=>{
  try{
    const {id} =req.params;
     const result =await updateProductBYid(id,req.body)
     res.status(200).json({
      staus:{success:true},
      message:'product update',

     })
  }
  catch(error){
    res.status(400).json({
      staus:{success:false},
      message:'product not update',
      error:error.message
   })
  }

}

exports.bulkUpdate=async(req,res,next)=>{
 try{
   const result= await bulkUpdateProduct(req.body)
   
   res.status(200).json({
    success:true,
    message:'bulk update done',
   })
 }

 catch(error){
   res.status(400).json({
    success:false,
    message:'not bulk update',
    error:error.message
   })

 }
}


exports.deleteProductBYId=async(req,res,next)=>{
  try{
    const {id} =req.params;
     const result =await deletProductBYid(id)
     if(!result.deletedCount){
       return res.status(400).json({
       staus:"fail",
        error:'Could,t delete the product'
       })
     }
     res.status(200).json({
      staus:{success:true},
      message:'product delete',

     })
  }
  catch(error){
    res.status(400).json({
      staus:{success:false},
      message:'product not deleted',
      error:error.message
   })
  }

}

exports.bulkDelete=async(req,res,next)=>{
  try{
    const result= await bulkDeletProduct(req.body)
    
    res.status(200).json({
     success:true,
     message:'bulk update done',
    })
  }
 
  catch(error){
    res.status(400).json({
     success:false,
     message:'not bulk update',
     error:error.message
    })
 
  }
 }


 exports.fileUpload= async(req,res)=>{
   try {
res.status(200).json(req.file)
   }
 catch(error){
  
 }
 }