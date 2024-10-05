const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/orderClothes", async (req, res) => {
  const {
    userId,
    lender,
    clothingType,
    brand,
    size,
    gender,
    condition,
    description,
    rentalPrice,
    deposit,
    location,
    photoUrl,
  } = req.body;

  try {
    const newOrder = new Order({
      userId: userId,
      lender: lender,
      clothingType: clothingType,
      brand: brand,
      size: size,
      gender: gender,
      condition: condition,
      description: description,
      rentalPrice: rentalPrice,
      deposit: deposit,
      location: location,
      photoUrl: photoUrl,
    });

    await newOrder.save();
    res.status(200).json({ message: "Order placed successfully!" }); // Send success message
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).json({ message: "Error placing order." }); // Send error message
  }
});

module.exports = router;
