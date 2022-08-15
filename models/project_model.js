const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    companyLogo: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Project", projectSchema);