let https = require("https");
//function for sending OTP process
const otpSending = async(mobile, otp) => {
    const message = process.env.OTP_WELCOME;

    // Third party host info 
    let options = {
        host: 'vas.banglalink.net',
        path: '/sendSMS/sendSMS?msisdn=' + mobile + '&message=' + message + otp + '&userID=OLYMPIC&passwd=OlympicAPI@019&sender=Greeho.com',
        method: 'POST'
    };

    let request = https.request(options, function(responce) {
        var body = '';
        responce.on("data", function(chunk) {
            body += chunk.toString('utf8');
        });
        responce.on("end", function() {
            console.log("Body", body);
        });
    });

    request.end();
}
module.exports = otpSending;