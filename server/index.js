const express = require("express");
const dotenv = require("dotenv");
const connectToMongoDb = require("./db/db");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

const port = process.env.PORT;

connectToMongoDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

