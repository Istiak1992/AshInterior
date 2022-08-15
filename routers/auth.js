//import required libraries and files
const express = require('express');
const router = express.Router();
const upload = require("../utils/fileUpload");
const {
  registerUser,
  loginUser,
  // otpVerify,
  // otpReSend,
  // viewProfile,
  // updateProfile,
  // updateProfilePhoto,
  // updatePassword,
  logout,
  // resetPassword,
  // passToken,
  // refreshToken,
  // validateToken,
  // getUserDataById,
} = require("../controllers/authController");

// import auth middlewares and object "isAuthenticatedUser" which  verify Authenticate user..
const { isAuthenticatedUser } = require("../middlewares/auth");


//-----------------Define the required routers-------------------//

//route for registration process
router.route('/register').post(registerUser);
//route for login process
router.route('/login').post(loginUser);
//route for logout process 
router.route('/logout').get(logout);



module.exports = router;