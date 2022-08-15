const mongoose = require("mongoose");

const contentheaderSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    
    headerPhoto: {
        type: String,
        required: true
        
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
   
});



module.exports = mongoose.model("ContentHeader", contentheaderSchema);