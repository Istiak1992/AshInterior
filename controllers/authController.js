//import required libraries and files
const User = require('../models/user_model');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken, generateAccessToken, extractToken, } = require("../utils/jwtToken");
const jwt = require("jsonwebtoken");
const { _response } = require("../utils/response");
const { pickRandom, generateOTP } = require("../utils/function");
let https = require("https");
const crypto = require('crypto');
const { decodeBase64 } = require('bcryptjs');
const fs = require('fs')
const path = require('path')
const removeSpaces = str => str.replace(/\s/g, '');



// Register a user   => /api/accounts/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    //code destructure from "req.body" postman
    const {
        username,
        email,
        password,
        confirmPassword,
      
    } = req.body;


    try {
        //verify password
        if (password !== confirmPassword) {
            return res.status(406).json({
                message: _response.dontMatchPassword
            })
        }

       

        //find User by Mobile No...
        const existingUser = await User.findOne({
            email: email
        });

        //check existing user..
        if (existingUser) {
            return res.status(406).json({
                message: _response.alreadyRegistered
            })
        }

        var user;
        //new user created...
        user = await User.create({
            username,
            email,
            password,
            
        })

    
        //call sendToken function for sending token to user
        sendToken(user, 200, res)


    } catch (error) {
        // error code 11000 indicates duplicate key error...
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyValue)[0];

            return res.status(400).json({
                message: `Provided ${duplicateKey} already exists.`,
            });
        }
        throw error;
    }



});

// //verify OTP => /api/accounts/v1/otpverify
// exports.otpVerify = async (req, res) => {
//     let {
//         mobile,
//         otp
//     } = req.body;
//     let message;

//     const phnCustomize = (mobile, res) => {
//         /* REMOVE_UNWANTED_CHAR */
//         let withoutChar;
//         withoutChar = mobile.replace(/[^0-9]/g, "");
//         mobile = withoutChar.substr(withoutChar.length - 10);
//         mobile.length === parseInt(process.env.PHONE_NUMBER_DIGITS) - 1 ? mobile = process.env.PHONE_NUMBER_CODE + mobile : mobile = null;
//         return mobile;
//     }

//     try {
//         /* CUSTOMIZE_PHONE_NO */
//         if (mobile === null) {
//             return res.status(422).json({
//                 message: {
//                     mobile: _response.invalid
//                 }
//             })
//         };

//         /* EXISTING_USER */
//         const existingUser = await User.findOne({
//             mobile: mobile
//         });

//         if (!existingUser) {
//             return res.status(406).json({
//                 message: _response.unAuthorized
//             })
//         } else if (existingUser.otp === null && existingUser.verified === true) {
//             return res.status(406).json({
//                 message: _response.alreadyVerified
//             })
//         } else if (existingUser.otp !== null && existingUser.verified === false && existingUser.otp === otp) {
//             await existingUser.update({
//                 otp: null,
//                 verified: true,

//             });
//             return res.status(200).json({
//                 message: _response.otpVerified
//             })
//         } else if (existingUser.otp !== otp) {
//             return res.status(400).json({
//                 message: _response.wrongOTP
//             })
//         }

//     } catch (error) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     };
// };

// //Resend OTP => /api/accounts/v1/otpReSend
// exports.otpReSend = async (req, res) => {
//     let {
//         mobile
//     } = req.body;
//     const otp = generateOTP();

//     const phnCustomize = (mobile, res) => {
//         /* REMOVE_UNWANTED_CHAR */
//         let withoutChar;
//         withoutChar = mobile.replace(/[^0-9]/g, "");
//         mobile = withoutChar.substr(withoutChar.length - 10);
//         mobile.length === parseInt(process.env.PHONE_NUMBER_DIGITS) - 1 ? mobile = process.env.PHONE_NUMBER_CODE + mobile : mobile = null;
//         return mobile;
//     }

//     try {
//         // Checking Mobile Number
//         const user = await User.findOne({
//             mobile: mobile
//         });

//         //valid user check
//         if (!user || user === null) {
//             return res.status(401).json({
//                 message: _response.unAuthorized
//             })
//         }

//         /* value check */
//         if (mobile === null) {
//             return res.status(422).json({
//                 message: {
//                     mobile: _response.invalid
//                 }
//             })
//         };


//         //OTP Send function called 
//         // parameter send mobile no & otp 
//         OtpSending(mobile, otp);

//         /* EXISTING USER Checking*/
//         const existingUser = await User.findOne({
//             mobile: mobile
//         });

//         // updated otp and verfied status
//         const otpResend = await existingUser.update({
//             otp: otp,
//             verified: false,
//         });

//         //otp Resend check
//         if (!otpResend) {
//             return res.status(424).json({
//                 message: _response.failed
//             })
//         };

//         //successfully message response
//         return res.status(200).json({
//             message: _response.createAndVerify
//         });

//     } catch (error) {
//         //error through message
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     };
// };


//Login User => /api/accounts/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({
                message: _response.loginFail
            })
        }

        const user = await User.findOne({
            email
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: _response.unAuthorized
            })
        }

        //check password validity
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: _response.isnotPasswordMatched
            })
        }

        sendToken(user, 200, res)



    } catch (err) {
        return res.status(500).json({
            message: _response.internalError
        });
    }
})



// //View User's Profile => /api/accounts/v1/viewProfile
// exports.viewProfile = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const userProfile = await User.findById(req.user._id);
//         res.status(200).json({
//             success: true,
//             userProfile
//         });
//     } catch (err) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     }

// });


// //Update User's Profile => /api/accounts/v1/updateProfile 
// exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

//     try {
//         const newUserData = {
//             name: req.body.name,
//             username: req.body.username,
//             email: req.body.email,
//             mobile: req.body.mobile,
//             password: req.body.password,
//             address: req.body.address,
//             dob: req.body.dob,
//             gender: req.body.gender,
//             occupation: req.body.occupation,
//             avatar: req.body.avatar,
//             permission: req.body.permission,
//             role: req.body.role,
//         }

//         const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
//             new: true,
//             runValidators: true,
//             useFindAndModify: false
//         })

//         res.status(200).json({
//             success: true,
//             user,
//             message: _response.update
//         })
//     } catch (err) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     }
// })


// //Update User's Profile Photo => /api/accounts/v1/updateProfilePhoto 
// exports.updateProfilePhoto = catchAsyncErrors(async (req, res, next) => {
//     let imagePath;
//     if (!req.file) {
//         return res.status(424).json({
//             message: _response.noImage
//         })
//     };

//     try {
//         /* EXISTING_USER */
//         const existingUser = await User.findById(req.user._id)

//         if (existingUser) {
//             /* PATH_SETTING */
//             const file = req.file;
//             const url = req.protocol + '://' + req.get('host')
//             var imgPath = url + '/public/uploads/' + req.file.filename

//             /* IMAGE_UPDATE */
//             const newUserData = await ({
//                 avatar: imgPath
//             });

//             const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
//                 new: true,
//                 runValidators: true,
//                 useFindAndModify: false
//             })

//             if (!user) {
//                 return res.status(424).json({
//                     message: _response.failed
//                 })
//             };
//             return res.status(200).json({
//                 success: true,
//                 user,
//                 message: _response.update
//             });

//         } else {
//             return res.status(404).json({
//                 message: _response.unAuthorized
//             })
//         };

//     } catch (error) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     };

// })

// // update or change password => /api/accounts/v1/password/update
// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

//     const {
//         oldPassword,
//         password,
//         confirmPassword
//     } = req.body;

//     //verify password
//     if (password !== confirmPassword) {
//         return res.status(406).json({
//             message: _response.dontMatchPassword
//         })
//     }


//     try {
//         const user = await User.findById(req.user.id).select('+password');

//         //check previous user password
//         const isMatched = await user.comparePassword(oldPassword);

//         if (!isMatched) {
//             return res.status(500).json({
//                 message: _response.oldPass
//             });
//         }

//         user.otp = "null",
//             user.password = password;
//         await user.save();

//         sendToken(user, 200, res)

//     } catch (err) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     }

// })


//Logout User => /api/accounts/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: _response.loggedOut
    })
})


// // Reset Password   =>  /api/accounts/v1/password/reset/:token
// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

//     const {
//         password,
//         confirmPassword,
//         otp
//     } = req.body;

//     try {
//         // Checking Mobile Number
//         const user = await User.findOne({
//             mobile: req.params.token
//         });

//         //Valid mobile no check 
//         if (!user || user === null) {
//             return res.status(406).json({
//                 message: _response.unAuthorized
//             })
//         }

//         //verify password
//         if (password !== confirmPassword) {
//             return res.status(406).json({
//                 message: _response.dontMatchPassword
//             })
//         }

//         //User OTP find
//         const otpChecking = await User.findOne({
//             otp: otp
//         });

//         // OTP Checking
//         if (!otpChecking) {
//             return res.status(406).json({
//                 message: _response.wrongOTP
//             })
//         } else if (otpChecking.otp !== null && otpChecking.verified === false && otpChecking.otp === otp) {
//             await otpChecking.update({
//                 otp: null,
//                 verified: true
//             })
//         } else if (otpChecking.otp !== otp) {
//             return res.status(400).json({
//                 message: _response.wrongOTP
//             })
//         }

//         // user password update
//         user.password = req.body.password;
//         await user.save();

//         //Send Token Function and pass parameter. 
//         sendToken(user, 200, res)
//     } catch (err) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     }

// })

// exports.passToken = catchAsyncErrors(async (req, res, next) => {
//     //global.localstorage.setItem('token', token);
//     //console.log(global.localstorage.getItem('token'));

//     token = req.header('authorization');

//     userToken = token.replace('Bearer ', '');

//     // console.log(userToken);
//     var decoded = jwt.verify(userToken, process.env.JWT_SECRET);


//     jwt.verify(userToken, process.env.JWT_SECRET, function (err, decoded) {
//         var userId = decoded.id;
//         // currentUserPermission = decoded.permission.toString();

        

//         // console.log({decoded, userName, userRole})
//         // console.log('-----------S----------')
//         // console.log(`permissions - > ${permissions}`);
//         // console.log('-----------E----------')

//         // console.log(permissions.toString(), currentUserPermission);

//         // if (permissions.includes(currentUserPermission)) {
//         //     next();
//         // } else {
//         //     res.status(401).json({
//         //         status: 401,
//         //         message: _response.notAuthorized,
//         //     });
//         // }

//     })

//         // console.log({decoded})

//         // const userData = await User.findById(decoded.id);
//         // console.log(userData);

//         const user = await User.findById(decoded.id)
//             .populate({
//                 path: 'roles',
//                 model: 'Role',
                
//                 populate: [{
//                     path: 'permissions',
//                     model: 'Permission'
//                 }]
//             })

//             console.log('=========S==============')
//             console.log(user)
//             console.log('=========E==============')

//         res.status(200).json({
//             currentDate: new Date().toUTCString(),
//             status: 200,
//             message: _response.getSuccessDatasList,
//             data: { user }
//         });



// });

// exports.validateToken = catchAsyncErrors(async (req, res, next) => {
//     // 'isRefreshToken' query param shall be set to true for validating refresh tokens...
//     const isRefreshToken = req.query['isRefreshToken'] === 'true';
//     // captures authorization header value...
//     const authorization = req.headers['authorization'];
//     // extracts authorization token from authorization header...
//     const token = extractToken(authorization);

//     try {
//         // verifies access token...
//         jwt.verify(token, isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET);
//     } catch (error) {
//         if (error instanceof jwt.TokenExpiredError) {
//             throw new ErrorHandler(`${isRefreshToken ? 'Refresh' : 'Access'} token has expired.`, 400);
//         }

//         throw new ErrorHandler(`Invalid ${isRefreshToken ? 'refresh' : 'access'} token provided.`, 400);
//     }

//     res.status(200).send({
//         currentDate: new Date().toUTCString(),
//         status: 200,
//         // message: `${isRefreshToken ? 'Refresh' : 'Access'} token is valid.`,
//         message: `${isRefreshToken ? 'refreshToken' : 'accessToken'} token is valid.`,
//     });
// });

// exports.refreshToken = catchAsyncErrors(async (req, res, next) => {
//     // captures authorization header value...
//     const authorization = req.headers['authorization'];
//     // generates access token from the refresh token provided via authorization header...
//     const { accessToken, refreshToken, } = generateAccessToken(authorization);

//     res.status(200).send({
//         currentDate: new Date().toUTCString(),
//         status: 200,
//         message: 'Access token renewal successful.',
//         data: {
//             accessToken: accessToken,
//             refreshToken: refreshToken,
//         },
//     });
// });

// //View User's Profile => /api/accounts/v1/viewProfile
// exports.getUserDataById = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id)
//             .populate({
//                 path: 'roles',
//                 model: 'Role',
                
//                 populate: [{
//                     path: 'permissions',
//                     model: 'Permission'
//                 }]
//             })     

//         res.status(200).json({
//             currentDate: new Date().toUTCString(),
//             status: 200,
//             message: _response.getSuccessDatasList,
//             user 
//         });

//     } catch (err) {
//         return res.status(500).json({
//             message: _response.internalError
//         });
//     }

// });