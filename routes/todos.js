const express = require("express");
const router = express.Router();

const {addTodo, getAllTodos, getTodoById, deleteTodo,updateTodo, markComplete} = require("../controllers/todos")
//param
router.param('todoId', getTodoById)

//actual routes
router.post("/add", addTodo)
router.get("/todos", getAllTodos)
router.put("/update/:todoId", updateTodo)
router.put("/mark/:todoId", markComplete)
router.delete("/delete/:todoId", deleteTodo)

router.use((req, res) => {
    res.sendFile(__dirname, "client/build/index.html");
})
module.exports = router