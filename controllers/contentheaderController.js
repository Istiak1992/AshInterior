//import required libraries and files
const ContentHeader = require('../models/contentheader_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");
const { log } = require("console");




// Register a user   => /api/content/v1/contentheader/add
exports.addContentHeader = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        title,
        subTitle,
        headerPhoto,
      
    } = req.body;

    //console.log("******************");
    //console.log(req.body);
    //console.log("******************");

    try{
        const content = await ContentHeader.create({
            title,
            subTitle,
            headerPhoto,
        });

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.success,
            data: {content}
        });
        
    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }

});


exports.listContentheader = catchAsyncErrors(async (req, res, next) => {
    try{
        content = await ContentHeader.find();

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.retrieved_success,
            data: {content}
        });

    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }
    

});

exports.updateContentheader = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        subTitle,
        headerPhoto,
    } = req.body;
    try{
        const content = await ContentHeader.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
      
      
          res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: {content}
          });
    } catch (err) {
      //Error message response
      return res.status(500).json({
        message: _response.internalError,
      });
    }
});

//// customerInfo Delete  => /api/property/v1/eligibility/delete
exports.deleteContentheader = catchAsyncErrors(async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
        ////Param valid check
        if (!isValidId) {
          return res.status(400).json({
            message: _response.isNotValidId,
          });
        }
    
        ////collection data find
        let content = await ContentHeader.findById(req.params.id);
    
        //// condition check
        if (!content) {
          return res.status(404).json({
            message: _response.notFound,
          });
        }
    
        //product delete  by product id
        await content.remove();
    
    
        res.status(200).json({
          currentDate: new Date().toUTCString(),
          status: 200,
          message: _response.delete,
          data: { content }
        });
    
      } catch (err) {
        //Error message response
        return res.status(500).json({
          message: _response.internalError,
        });
      }

});

