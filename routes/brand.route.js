const express =require('express');
const brandController=require('../controllers/brand.controller')
const router =express.Router();



router.route("/")
.get(brandController.getBrands)
.post(brandController.creatBrand)


router.route("/:id")
.get(brandController.getBrandById)
.patch(brandController.updateBrand)
module.exports=router;