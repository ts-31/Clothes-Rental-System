const express = require("express");
const User = require("../models/User");
const Message = require("../models/Message");
const router = express.Router();

router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.json(users.map((user) => ({ id: user._id, name: user.username })));
  } catch (error) {
    console.log("Error msg: ", error);
    res.status(500).send("Server Error");
  }
});

router.get("/messages/:userId/:receiverId", async (req, res) => {
  const { userId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.post("/messages/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  try {
    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/history/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

module.exports = router;
