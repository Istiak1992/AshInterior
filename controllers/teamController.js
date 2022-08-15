
//import required libraries and files
const Team = require('../models/team_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { _response } = require("../utils/response");
const { default: mongoose } = require("mongoose");
const { log } = require("console");




exports.addTeam = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        name,
        designation,
        photo,
      
    } = req.body;

    //console.log("******************");
    console.log(req.body);
    //console.log("******************");

    try{
        const team = await Team.create({
            name,
            designation,
            photo,
        });

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.success,
            data: {team}
        });
        
    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }

});


exports.listTeam = catchAsyncErrors(async (req, res, next) => {
    try{
        team = await Team.find();

        res.status(200).json({
            createDate: new Date().toUTCString(),
            success: true,
            status: 200,
            message: _response.retrieved_success,
            data: {team}
        });

    } catch(err){
        res.status(500).json({
            status: 500,
            message: _response.internalError,
            });

    }
    

});

exports.updateTeam = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        designation,
        photo,
    } = req.body;
    try{
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          });
      
      
          res.status(200).json({
            currentDate: new Date().toUTCString(),
            status: 200,
            message: _response.update,
            data: {team}
          });
    } catch (err) {
      //Error message response
      return res.status(500).json({
        message: _response.internalError,
      });
    }
});


exports.deleteTeam = catchAsyncErrors(async (req, res, next) => {
    try {
        let isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    
        ////Param valid check
        if (!isValidId) {
          return res.status(400).json({
            message: _response.isNotValidId,
          });
        }
    
        ////collection data find
        let team = await Team.findById(req.params.id);
    
        //// condition check
        if (!team) {
          return res.status(404).json({
            message: _response.notFound,
          });
        }
    
        
        await team.remove();
    
    
        res.status(200).json({
          currentDate: new Date().toUTCString(),
          status: 200,
          message: _response.delete,
          data: { team }
        });
    
      } catch (err) {
        //Error message response
        return res.status(500).json({
          message: _response.internalError,
        });
      }

});

