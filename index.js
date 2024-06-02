const express = require('express')
const app = express()
const todosRouter = require('./router/todosRouter')
const database = require('./database')
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))

database()
app.use("/todos",todosRouter)

app.listen(process.env.PORT, ()=>{
    console.log("server started at 8000...");
})