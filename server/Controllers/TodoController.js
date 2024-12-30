
const Todo = require("../models/Todo")

const createNewTodo = async (req, res) => {
    const { title, tags } = req.body
    if (!title)
        return res.status(400).json({ message: "title is required" })
    const todo = await Todo.create({ title, tags })
    if (todo) {
        return res.json(await Todo.find())
    } else {
        return res.status(400).json({ message: "invalid todo" })
    }
}

const getAllTodo = async (req, res) => {

    const todos = await Todo.find().lean()
    if (!todos) {
        return res.status(400).json({ message: "no todos found" })
    }
    res.json(todos)

}

const getTodoById = async (req, res) => {

    const { id } = req.params
    const todo = await Todo.findById(id).lean()
    if (!todo) {
        return res.status(400).json({ message: "no todo found" })
    }
    res.json(todo)
}
const getUnCompletedTodo = async (req, res) => {

    const todo = await Todo.find({ completed: false }).lean()
    if (!todo) {
        return []
    }
    res.json(todo)
}
const getTodoByTitle = async (req, res) => {
    const { title } = req.params
    const todo = await Todo.find({ title:{$regex :title}  }).lean()
    if (!todo) {
        return res.json([])
    }
    res.json(todo)
}
const updateTodo = async (req, res) => {
    const { _id, title, tags, completed } = req.body
    if (!_id || !title)
        return res.status(400).json({ message: "fildes are required" })
    const todo = await Todo.findById(_id).exec()
    if (!todo) {
        return res.status(400).json({ message: "todo not found" })
    }
    todo.title = title
    todo.tags = tags
    todo.completed = completed

    await todo.save()
    res.json(await Todo.find())
}
const updateTodoComplete = async (req, res) => {
    const { id } = req.params
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: "todo not found" })
    }
    todo.completed = !todo.completed
    await todo.save()
    res.json(await Todo.find())
}
const deleteTodo = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).json({ message: "id is required" })
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: "todo not found" })
    }
    await todo.deleteOne()
    res.json(await Todo.find())
}


module.exports = {
    updateTodoComplete, getUnCompletedTodo,
    createNewTodo, getAllTodo, getTodoById,
    updateTodo, deleteTodo, getTodoByTitle
}