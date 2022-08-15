const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
    },
   
    image: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Gallery", gallerySchema);