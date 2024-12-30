const User = require("../models/User")

const createNewUser = async (req, res) => {
    const { name, userName,email,address,phone } = req.body
    if (!userName||!email)
        return res.status(400).json({ message: 'userName and email is required' })
     if (phone.length<9 || phone.length>10)
            return res.status(400).json({ message: 'טלפון לא תקין' })

    const user = await User.create({ name, userName,email,address,phone})
    if (!user)
        return res.status(400).send('invalid user')
    res.json(await User.find())
}

const getAllUsers = async (req, res) => {
   const users=await User.find().lean()
   if (!users)
    return res.status(400).send('users no found')
res.json(users)
}

const getUserById = async (req, res) => {
    const {id}=req.params
    const user=await User.findById(id).lean()
    if (!user)
     return res.status(400).send('user no found')
 res.json(user)
 }
 const getuserByUserName = async (req, res) => {
    const { userName } = req.params
    const user = await User.find({ userName:{$regex :userName}  }).lean()
    if (!user) {
        return res.json([])
    }
    res.json(user)
}

 const updateUser = async (req, res) => {
    debugger
    const {_id, name, userName,email,address,phone  } = req.body
    if (!userName||!_id|| !email)
        return res.status(400).json({ message: 'user and email and id is required' })
    const user = await User.findById(_id).exec()
    if (!user)
        return res.status(400).send('user no found')
    user.userName=userName
    user.name=name
    user.email=email
    user.address=address
    user.phone=phone
const updateuser=await user.save()
res.json(await User.find())
}

const deleteUser = async (req, res) => {
    const {id } = req.params
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const user = await User.findById(id).exec()
    if (!user)
        return res.status(400).send('user no found')

const del=await user.deleteOne()
        res.json(await User.find())
}
module.exports = { createNewUser,getAllUsers,getUserById,updateUser,deleteUser,getuserByUserName }