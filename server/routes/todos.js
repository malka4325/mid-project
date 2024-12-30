const express=require("express")
const router=express.Router()
const todoController=require("../Controllers/TodoController")

router.get("/",todoController.getAllTodo)
router.get("/getById/:id",todoController.getTodoById)
router.post("/",todoController.createNewTodo)
router.put("/",todoController.updateTodo)
router.delete("/:id",todoController.deleteTodo)
router.get("/unCompleted",todoController.getUnCompletedTodo)
router.get("/byTilte/:title",todoController.getTodoByTitle)
router.put("/:id",todoController.updateTodoComplete)

module.exports=router