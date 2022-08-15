const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    propertyId: {
        type: String,
    },
    location: {
        type: String,
    },
    size: {
        type: String,
    },
    bed: {
        type: String,
    },
    bath: {
        type: String,
    },
    floor: {
        type: String,
    },
    lift: {
        type: Boolean,
        default: false,
    },
    balcony: {
        type: String,
    },
    parking: {
        type: Boolean,
        default: false,
    },
    gas: {
        type: String,
    },
    unit: {
        type: String,
    },
    commonSpace: {
        type: String,
    },
    kitchen: {
        type: String,
    },
    kitchenCabinet: {
        type: String,
    },
    kitchenHood: {
        type: String,
    },
    propertyType: {
        type: String,
    },
    totalArea: {
        type: String,
    },
    totalFloor: {
        type: String,
    },
    buildingFacing: {
        type: String,
    },
    buildingYear: {
        type: String,
    },
    electricity: {
        type: String,
    },
    water: {
        type: String,
    },
    allowPet: {
        type: String,
    },
    houseRules: {
        type: String,
    },
    areaFacilities: {
        type: String,
    },
    avatar: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model("Product", productSchema);