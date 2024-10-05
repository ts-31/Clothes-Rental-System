const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    // The renter (person renting the clothes)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lender: {
    // The person who posted the clothes (owner)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
    required: true,
  },
  deposit: {
    type: Number,
  },
  location: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
