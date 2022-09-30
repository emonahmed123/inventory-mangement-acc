const Product =require('../models/Product')
exports.getProductService= async()=>{
    const products= await Product.find({})
   return products;
}

exports.createProductService =async(data)=>{
    const product= await Product.create(data)
    return product;
}

exports.createBulkProductService=async(data)=>{
    const product=await Product.insertMany(data)
    return product
}



exports.updateproductBYid= async(ProductId,data)=>{
const result= await Product.updateOne({_id:ProductId},{$set:data},{
    runValidators:true,
})

  return result
} 

exports.bulkUpdateProduct= async(data)=>{
    // const result= await Product.updateMany({_id:data.ids},data,{
    //     runValidators:true
    // })
 const products =[];
 data.ids.forEach(product=>{
  products.push(Product.updateOne({_id:product.id},product.data)
 )})
 const result =await Promise.all(products)
  console.log(result)   
 return result
}


exports.deletProductBYid=async(id)=>{

    const result =await Product.deleteOne({_id:id});
    return result

}

exports.bulkDeletProduct= async(id)=>{
    const result= await  Product.deleteMany({})

 return result
}  