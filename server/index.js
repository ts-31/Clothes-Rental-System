const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToMongoDb = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const lendRoutes = require("./routes/clothesRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/post', lendRoutes);

const port = process.env.PORT || 5000;

connectToMongoDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
