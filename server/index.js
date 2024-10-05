const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongoDb = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const lendRoutes = require("./routes/clothesRoute");
const chatMessageRoutes = require("./routes/chatMessageRoute");
const orderRoute = require("./routes/orderRoute");
const Message = require("./models/Message");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", lendRoutes);
app.use("/api/msg", chatMessageRoutes);
app.use("/api/order", orderRoute);

const port = process.env.PORT || 5000;

connectToMongoDb().then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log("Room created: ", roomId);
  });

  socket.on("privateMessage", async ({ roomId, message, sender }) => {
    const [user1, user2] = roomId.split("-");
    const receiver = user1 === sender ? user2 : user1;
    try {
      const newMessage = new Message({
        sender,
        receiver,
        content: message,
      });

      await newMessage.save();
      io.to(roomId).emit("receiveMessage", {
        content: message,
        sender,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
