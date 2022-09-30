const express =require('express');
const router =express.Router();
const productController=require("../controllers/product.controller")
router.route('/')

.get(productController.getProducts)
.post(productController.CreateProduct);
  
router.route("/bulk-Create")
.post(productController.CreateBulkProduct)


 router.route("/bulk-update")
.patch(productController.bulkUpdate)

 router.route("/bulk-delete")
.delete(productController.bulkDelete)



router.route('/:id')
.delete(productController.deleteProductBYId)
.patch(productController.updateProductBYId) 


module.exports=router;