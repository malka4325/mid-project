
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    email:{
        type:mongoose.Schema.Types.String,
        required: true
    },
    address:{
        type: String
    },
    phone:{
        type: String,
    },
},
    {
        timestamps: true
    })
    module.exports=mongoose.model('User',userSchema)
