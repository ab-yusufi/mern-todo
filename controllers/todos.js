const todos = require("../models/todos")
const Todos = require("../models/todos")

exports.getTodoById = (req, res, next, id) => {
    Todos.findById(id).exec((err, todo) => {
        if(err){
            return res.status(400).json({
                error: "Todo not found"
            })
        }        
        req.todo = todo
        next();
    })
}

exports.addTodo = (req, res) => {
    const todos = new Todos(req.body);

    todos.todo = req.body.todo;
    todos.description = req.body.description;

    todos.save((err, todo) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                success: false,
                error: "Unable to save todo in DB"
            })
        }
        return res.json({
            todo: todo,
            success: true,
            message: "Todo Saved"
        })
    })
}

exports.getAllTodos = (req, res) => {
    Todos.find((err, todos) => {
        if(err){
            return res.status(400).json({
                error: "No Todos Found"
            })
        }

        var todosList = []
        todos.forEach((item, index) => {
            todosList.push(item)
        })
        
        res.json(todos)
        
    })
}

exports.deleteTodo = (req, res) => {
    const todo = req.todo
    todo.remove((err, todo) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete Todo"
            })
        }
        res.json(todo)
    })
}

// TODO: Update Todo
exports.updateTodo = (req, res) => {
    const todo = req.todo
    todo.todo = req.body.todo

    todo.save((err, updatedTodo) => {
        if(err){
            console.log(err)
            return res.status(400).json({
                success: false,
                error: "Unable to Update TODO"
            })
        }

        return res.json({
            todo: updatedTodo,
            success: true,
            message: "Todo Updated"
        })
    })
}

exports.markComplete = (req, res) => {
    const todo = req.todo
    todo.isCompleted = !todo.isCompleted

    todo.save((err, completedTodo) => {
        if(err){
            return res.state(400).json({
                success: false,
                error: "Something Went Wrong"
            })
        }
        res.json({
            todo: completedTodo,
            success: true,
            message: "Todo Completed"
        })
    })
}
