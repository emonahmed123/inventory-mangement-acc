const express =require('express');
const router =express.Router();
const productController=require("../controllers/product.controller")
const uploader= require("../middleware/uploader")
const multer =require('multer');
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");
  router.post("/file-upload",uploader.single('image'), productController.fileUpload)
router.route('/')
.get(productController.getProducts)
.post(verifyToken, authorization("admin", "store-manage"),  productController. CreateProduct);
  
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