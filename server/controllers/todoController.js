const ToDo = require("../models/todoModel");
const User = require("../models/userModel");

const createToDo = async (req, res) => {
    try {
        const {task} = req.body;
        const { userId } = req.query;

        const newTodo = new ToDo({
            task,
            userId: userId
            // userId: req.user._id,
        });
        newTodo.save();
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

const updateToDo = async (req, res) => {
    try {
        const {task, completed} = req.body;
        const todo = await ToDo.findById(req.params.id)
        if (!todo) return res.status(500).json("To Do Not Found!!!")
        const data = {task, completed}
        const newToDo = await ToDo.findByIdAndUpdate(req.params.id, data)
        const updateToDo = await newToDo.save();
        res.status(200).json(updateToDo)
    } catch (error) {
        res.status(500).json(error)

    }
}

const deleteToDoId = async (req, res) => {
    try {
        const todo = await ToDo.findById(req.params.id);
        if (req.user._id !== todo.userId) {
            res.status(403).json("Can't Delete To Do Other Account");
        } else {
            await todo.deleteOne();
            res.status(200).json("Delete Successfully");
        }

    } catch (err) {
        res.status(500).json(err);
    }
}


const deleteAllToDo = async (req, res) => {
    try {
        await ToDo.deleteMany()
        res.status(200).json("Delete Successful All To Do")
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllToDo = async (req, res) => {
    try {
        const {userId} = req.query;
        // const currentUser = req.params.userid;
        // if (req.user._id !== userId) return res.status(500).json("You can't get to do other account")
        // if(currentToDo ) return res.status(400).json("You Not Create To Do")
        const todos = await ToDo.find({userId});
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json(error)

    }
}


module.exports = {createToDo, getAllToDo, updateToDo, deleteToDoId, deleteAllToDo};
