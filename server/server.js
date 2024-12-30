require ("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT= process.env.PORT||1300
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("this is home page")
})

app.use("/api/posts",require("./routes/posts"))
app.use("/api/users",require("./routes/users"))
app.use("/api/todos",require("./routes/todos"))

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB')
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
})
mongoose.connection.on('error',err=>{
    console.log(err);
})