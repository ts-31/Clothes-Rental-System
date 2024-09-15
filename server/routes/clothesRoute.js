const express = require("express");
const lendPost = require("../models/ClothesPost");
const cloudinary = require("cloudinary").v2;
const { upload } = require("../middleware/multer.middleware");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/lend", upload.single("photo"), async (req, res) => {
  const {
    clothingType,
    brand,
    size,
    gender,
    condition,
    description,
    rentalPrice,
    deposit,
    location,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "your-folder-name",
    });
    const post = new lendPost({
      clothingType,
      brand,
      size,
      gender,
      condition,
      description,
      rentalPrice,
      deposit,
      location,
      photoUrl: result.secure_url,
    });
    await post.save();
    res.status(201).json({
      message: "Post uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image or saving post" });
  }
});

router.get("/rent", async (req, res) => {
  try {
    const data = await lendPost.find({});
    if (data.length === 0) {
      return res.status(400).json({ message: "No clothes available for rent" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
