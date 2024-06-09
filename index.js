const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const todosRouter = require('./router/todosRouter')
const authRouter = require('./router/authRouter')
const jokeRouter = require("./router/jokeRotuer")
const database = require('./database')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


database()
app.use("/todos",todosRouter)
app.use("/auth", authRouter)
app.use("/joke", jokeRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server started at ${process.env.PORT}`);
})