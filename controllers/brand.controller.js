const {createBrandService,getBrandsService,getBrandByIdService,updateBrandService} =require('../service/brand.service')
exports.creatBrand=async(req,res,next)=>{
    try{
   
        const result = await createBrandService(req.body)
         res.status(200).json({
          staus:{success:true},
          message:'Brand  Create ',
          data:result,
      
        })
      
       }
      catch(error)
      {
       res.status(400).json({
          staus:{success:false},
          message:'Brand Coudnot Create ',
          error:error.message
       })
      }
      
      }
exports.getBrands=async(req, res,next)=>{
    try{
   
        const Brands = await getBrandsService(req.body)
         res.status(200).json({
          staus:{success:true},
          message:'Brand  found ',
          data:Brands,
      
        })
      
       }
      catch(error)
      {
       res.status(400).json({
          staus:{success:false},
          message:'Brand Coudnot found ',
          error:error.message
       })
      }
      
      }
      


      exports.getBrandById = async (req, res, next) => {
        const { id } = req.params;
        try {
          const brand = await getBrandByIdService(id);
      
          if(!brand){
            return res.status(400).json({
              status: "fail",
              error: "Couldn't find a brand with this id"
            })
          }
      
          res.status(200).json({
            status: "success",
            data: brand,
          });
        } catch (error) {
          console.log(error);
          res.status(400).json({
            status: "fail",
            error: "Couldn't get the brands",
          });
        }
      };


      exports.updateBrand = async (req, res, next) => {
         const { id } = req.params;
        try {
          const result = await updateBrandService (id, req.body);
      
          console.log(result);
      
          if (!result.modifiedCount) {
            return res.status(400).json({
              status: "fail",
              error: "Couldn't update the brand with this id",
            });
          }
      
          res.status(200).json({
            status: "success",
            message: "Successfully updated the brand"
          });
        } catch (error) {
          console.log(error);
          res.status(400).json({
            status: "fail",
            error:error.message
          });
        }
      };