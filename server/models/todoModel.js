const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: {
    type: String,
    max: 500,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
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

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
