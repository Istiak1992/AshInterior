
//import required libraries and files
const Contact = require('../models/contact_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");
const { log } = require("console");




exports.addContact = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        name,
        email,
        message,
       
      
    } = req.body;

    //console.log("******************");
    //console.log(req.body);
    //console.log("******************");

    try{
        const contact = await Contact.create({
            name,
            email,
            message,
            
        });

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.success,
            data: {contact}
        });
        
    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }

});



exports.listContact = catchAsyncErrors(async (req, res, next) => {
    try{
        const contact = await Contact.find();

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.retrieved_success,
            data: {contact}
        });

    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }
    

});

exports.updateContact = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        email,
        message,
    } = req.body;
    try{
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
      
      
          res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: {contact}
          });
    } catch (err) {
      //Error message response
      return res.status(500).json({
        message: _response.internalError,
      });
    }
});


exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
        ////Param valid check
        if (!isValidId) {
          return res.status(400).json({
            message: _response.isNotValidId,
          });
        }
    
        ////collection data find
        let contact = await Contact.findById(req.params.id);
    
        //// condition check
        if (!contact) {
          return res.status(404).json({
            message: _response.notFound,
          });
        }
    
        
        await contact.remove();
    
    
        res.status(200).json({
          currentDate: new Date().toUTCString(),
          status: 200,
          message: _response.delete,
          data: { contact }
        });
    
      } catch (err) {
        //Error message response
        return res.status(500).json({
          message: _response.internalError,
        });
      }

});

