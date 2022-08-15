const jwt = require('jsonwebtoken');
const ErrorHandler = require('./errorHandler');


const extractToken = authorization => {
    // if invalid authorization header is provided...
    if (typeof authorization !== 'string' || !authorization.startsWith('bearer ')) {
        // sends erroneous response...
        throw new ErrorHandler('Invalid authorization token provided.', 400);
    }

    // otherwise authorization is valid...
    // so, we'll retrieve the first index of space...
    const indexOfSpace = authorization.indexOf(' ');

    // if space was not found...
    if (indexOfSpace === -1) {
        // sends erroneous response...
        throw new ErrorHandler('Invalid authorization token provided.', 400);
    }

    // removes the part 'bearer ' from authorization header to get authorization token...
    const token = authorization.substring(indexOfSpace + 1);

    if (!token) {
        throw new ErrorHandler('Invalid authorization token provided.', 400);
    }

    // returns extracted token...
    return token;
};

const generateAccessToken = authorization => {
    // extracts token from authorization header...
    const refreshToken = extractToken(authorization);
    // decodes refresh token...
    const decodedRefreshTokenPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // generates an access token...
    const accessToken = jwt.sign({
        id: decodedRefreshTokenPayload.id,
        username: this.username,
        roles: this.roles,
        permission: this.permission,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });

    // returns an object containing both access token and refresh token...
    return { accessToken, refreshToken };
};

const sendToken = (user, statusCode, res) => {

    let User ={};
    User.name =user.name;
    User.username =user.username;
    User.mobile =user.mobile;
    User.roles =user.roles;
    User.permission =user.permission;
      

    //create Jwt Token
    const token = user.getJwtToken();

    //create Jwt refresh Token
    const refreshToken = user.refreshToken();

    //option for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    
    res.status(statusCode).json({
        success: true,
        accessToken: token,
        refreshToken,
        User
    })
}

module.exports.sendToken = sendToken;
module.exports.extractToken = extractToken;
module.exports.generateAccessToken = generateAccessToken;
