
//import required libraries and files
const Product = require('../models/product_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");
const { log } = require("console");




exports.addProduct = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        title,
        description,
        image,
      
    } = req.body;

    //console.log("******************");
    //console.log(req.body);
    //console.log("******************");

    try{
        const product = await Product.create({
            title,
            description,
            image,
        });

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.success,
            data: {product}
        });
        
    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }

});



exports.listProduct = catchAsyncErrors(async (req, res, next) => {
    try{
        product = await Product.find();

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.retrieved_success,
            data: {product}
        });

    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }
    

});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        description,
        image,
    } = req.body;
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
      
      
          res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: {product}
          });
    } catch (err) {
      //Error message response
      return res.status(500).json({
        message: _response.internalError,
      });
    }
});

//// customerInfo Delete  => /api/property/v1/eligibility/delete
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
        ////Param valid check
        if (!isValidId) {
          return res.status(400).json({
            message: _response.isNotValidId,
          });
        }
    
        ////collection data find
        let product = await Product.findById(req.params.id);
    
        //// condition check
        if (!product) {
          return res.status(404).json({
            message: _response.notFound,
          });
        }
    
        //product delete  by product id
        await product.remove();
    
    
        res.status(200).json({
          currentDate: new Date().toUTCString(),
          status: 200,
          message: _response.delete,
          data: { product }
        });
    
      } catch (err) {
        //Error message response
        return res.status(500).json({
          message: _response.internalError,
        });
      }

});

