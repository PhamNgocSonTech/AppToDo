const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/mongodb");

const app = express();
const port = process.env.PORT;
app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
