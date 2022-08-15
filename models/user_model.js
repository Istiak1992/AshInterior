const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    
    password: {
        type: String,
        required: [true, "please enter your password"],
        minlength: [8, "Your password must be longer then 8 characters"],
        select: false
    },
   

    // permission: [{type:String}],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password before saving user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//comapre user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getJwtToken = function() {
    return jwt.sign({
        id: this._id,
        // username: this.username,
        // roles: this.roles,
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}


userSchema.methods.refreshToken = function() {
    return jwt.sign({
        id: this._id,
        // username: this.username,
        // roles: this.roles,
    }, process.env.JWT_REFRESH_SECRET)
}

//generate password reset token
userSchema.methods.getResetPasswordToken = function() {
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Has and set to resetPasswordToken 
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model("User", userSchema);