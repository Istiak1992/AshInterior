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
// //route for OTP verifying process
// router.route('/otpverify').put(otpVerify);
// //route for OTP resending process
// router.route('/otpReSend').put(otpReSend);
// //route for viewing profile 
// router.route('/viewProfile').get(isAuthenticatedUser, viewProfile);
// //route for update profile 
// router.route('/updateProfile').put(isAuthenticatedUser, updateProfile);
// //route for update profile photo
// router.put('/updateProfilePhoto', isAuthenticatedUser, upload.single('image'), updateProfilePhoto);
// //route for update user password 
// router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// //route for reset password process 
// router.route('/password/reset/:token').put(resetPassword);
// //pass the existing JWT token 
// router.route('/userInfoWithRole').get(passToken);
// //JWT token refresh token
// router.route('/refresh/token').get(refreshToken);
// // Used for token validation...
// router.route('/validateToken').get(validateToken);

// // User data get by token id (API)...
// router.route('/user/token/:id').get(getUserDataById);





module.exports = router;