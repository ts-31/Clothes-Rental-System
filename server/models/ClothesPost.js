const mongoose = require("mongoose");

const lendPostSchema = new mongoose.Schema({
    clothingType: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    size: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    rentalPrice: {
        type: Number,
    },
    deposit: {
        type: Number,
    },
    location: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    photoUrl: {
        type: String,
    }
});

module.exports = mongoose.model("lendPost", lendPostSchema);