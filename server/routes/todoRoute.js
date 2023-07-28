const express = require("express");
const router = express.Router();
const {createToDo, getAllToDo, updateToDo, deleteToDoId, deleteAllToDo} = require("../controllers/todoController");
const {verifyToken} = require("../middleware/auth");


router.get("/", verifyToken, getAllToDo);
router.post("/create", verifyToken, createToDo);
router.put("/update/:id", verifyToken, updateToDo);
router.delete("/delete/:id", verifyToken, deleteToDoId);
router.delete("/deleteAll/", verifyToken, deleteAllToDo);

module.exports = router;
