const express = require("express");
const Order = require("../models/Order");
const User = require("../models/User");
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
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.log("ERROR: ", error);
    res.status(500).json({ message: "Error placing order." });
  }
});

router.get("/orders", async (req, res) => {
  console.log("Req comes to backend");
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const orders = await Order.find({ userId: userId }).populate(
      "lender",
      "username"
    );

    console.log(orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Error fetching orders." });
  }
});

module.exports = router;
