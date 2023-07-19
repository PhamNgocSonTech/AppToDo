const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/mongodb");
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;
app.use(express.json());

connectDB();

// init routers

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
