
//import required libraries and files
const Gallery = require('../models/gallery_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");
const { log } = require("console");




exports.addGallery = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        title,
        image,
       
      
    } = req.body;

    //console.log("******************");
    console.log(req.body);
    //console.log("******************");

    try{
        const gallery = await Gallery.create({
            title,
            image,
            
        });

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.success,
            data: {gallery}
        });
        
    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }

});



exports.listGallery = catchAsyncErrors(async (req, res, next) => {
    try{
        gallery = await Gallery.find();

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.retrieved_success,
            data: {gallery}
        });

    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }
    

});

exports.updateGallery = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        image,
    } = req.body;
    try{
        const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
      
      
          res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: {gallery}
          });
    } catch (err) {
      //Error message response
      return res.status(500).json({
        message: _response.internalError,
      });
    }
});


exports.deleteGallery = catchAsyncErrors(async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
        ////Param valid check
        if (!isValidId) {
          return res.status(400).json({
            message: _response.isNotValidId,
          });
        }
    
        ////collection data find
        let gallery = await Gallery.findById(req.params.id);
    
        //// condition check
        if (!gallery) {
          return res.status(404).json({
            message: _response.notFound,
          });
        }
    
        
        await gallery.remove();
    
    
        res.status(200).json({
          currentDate: new Date().toUTCString(),
          status: 200,
          message: _response.delete,
          data: { gallery }
        });
    
      } catch (err) {
        //Error message response
        return res.status(500).json({
          message: _response.internalError,
        });
      }

});
