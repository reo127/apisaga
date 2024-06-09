const express = require('express')
const app = express()
const todosRouter = require('./router/todosRouter')
const authRouter = require('./router/authRouter')
const database = require('./database')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

database()
app.use("/todos",todosRouter)
app.use("/auth", authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT}`);
})