const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
require("dotenv").config();

const connectDB = require("./configs/mongodb");
const todoRouter = require("./routes/todoRoute");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// connect mongoDB
connectDB();

// init router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
