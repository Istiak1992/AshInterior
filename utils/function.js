const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
exports.getRandomInt = getRandomInt;



//generate random values
const pickRandom =(list) => {
    return list[Math.floor(Math.random() * list.length)];
}
exports.pickRandom = pickRandom;


//OTP Generator Function
const generateOTP=()=> {
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}
exports.generateOTP = generateOTP;