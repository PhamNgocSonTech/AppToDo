const express = require("express");
const router = express.Router();
const { createToDo,getAllToDo, updateToDo, deleteToDoId, deleteAllToDo } = require("../controllers/todoController");
const { verifyToken } = require("../middleware/auth");


router.post("/create", verifyToken, createToDo);
router.get("/:userid", verifyToken, getAllToDo );
router.put("/update/:id", verifyToken, updateToDo);
router.delete("/delete/:id", verifyToken, deleteToDoId );
router.delete("/deleteAll/", verifyToken, deleteAllToDo );

module.exports = router;
