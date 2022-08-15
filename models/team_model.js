const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    designation: {
        type: String,
    },
    photo: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Team", teamSchema);