const express = require("express");
const {  createServer } = require("node:http");
const { Server } = require("socket.io")
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongoDb = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const lendRoutes = require("./routes/clothesRoute");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],  
    credentials: true, 
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/post', lendRoutes);

const port = process.env.PORT || 5000;

connectToMongoDb().then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

io.on('connection', (socket) => {
  console.log("A user connected");

  socket.on('disconnect', () => {
    console.log("A user disconneced");
  });
});
