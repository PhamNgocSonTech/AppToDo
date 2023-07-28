const mongoose = require("mongoose");
const User = require("./userModel")

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    max: 500,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completed_time: {
    type: Date,
    default: null,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

const Todo= mongoose.model("Todo", todoSchema);
module.exports = Todo;
