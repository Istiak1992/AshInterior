const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

//check if user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    try {
        let token = req.cookies.token;

        // if token doesn't exist in cookies...
        if (typeof token !== 'string' || !token.length) {
            // we'll try to get access token from headers...
            const authorization = req.headers['authorization'];

            // if invalid authorization header is provided...
            if (typeof authorization !== 'string' || !authorization.startsWith('bearer ')) {
                // sends erroneous response...
                return next(new ErrorHandler('Login first to access this resourse', 401));
            }

            // otherwise authorization is valid...
            // so, we'll retrieve the first index of space...
            const indexOfSpace = authorization.indexOf(' ');

            if (indexOfSpace === -1) {
                // sends erroneous response...
                return next(new ErrorHandler('Login first to access this resourse', 401));
            }

            // removes the part 'bearer ' from authorization header to get access token...
            token = authorization.substring(indexOfSpace + 1);
        }

        if (!token) {
            return next(new ErrorHandler('Login first to access this resourse', 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        
        //console.log(req.user);
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return next(new ErrorHandler('Access token has expired.', 401))
        }

        return next(new ErrorHandler('Login first to access this resourse', 400))
    }

    next()
})

//Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resourse `))
        }
        next()
    }

}