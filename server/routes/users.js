const express=require("express")
const router=express.Router()
const userController=require("../Controllers/UserController")

router.get("/",userController.getAllUsers)
router.get("/:id",userController.getUserById)
router.get("/byUserName/:userName",userController.getuserByUserName)
router.post("/",userController.createNewUser)
router.put("/",userController.updateUser)
router.delete("/:id",userController.deleteUser)

module.exports=router