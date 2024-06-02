const Todo = require("../models/TodoSchema")



const postTodo = async(req, res) =>{
    try {
        const {todo} = req.body
        const success = await Todo.create({todo: todo})
        if(success){
            res.status(200).send({"massage": "Todo created...."})
        }
        res.status(400).send({"massage": "NOT created...."})

    } catch (err) {
        console.log(err);
    }
}



const updateTodo = async(req, res) =>{
    try {
        const {todo} = req.body
        const success = await Todo.findByIdAndUpdate(req.params.id, {todo: todo})
        if(success){
            res.status(200).send({"massage": "Todo Updated...."})
        }
        res.status(400).send({"massage": "NOT Updated...."})

    } catch (err) {
        console.log(err);
    }
}


const deleteTodo = async(req, res) =>{
    try {
        const success = await Todo.findByIdAndDelete(req.params.id)
        if(success){
            res.status(200).send({"massage": "Todo Deleted...."})
        }
        res.status(400).send({"massage": "NOT Deleted...."})

    } catch (err) {
        console.log(err);
    }
}


const getTodos = async(req, res) =>{
    try {
        const success = await Todo.find()
        if(success){
            res.status(200).send({success, "massage": "ok...."})
        }
        res.status(400).send({"massage": "NOT ok...."})
    } catch (err) {
        console.log(err);
    }
}

const getTodo = async(req, res) =>{
    try {
        const success = await Todo.findById(req.params.id)
        if(success){
            res.status(200).send({success, "massage": "ok...."})
        }
        res.status(400).send({"massage": "NOT ok...."})
    } catch (err) {
        console.log(err);
    }
}

module.exports = {postTodo, updateTodo, deleteTodo, getTodos, getTodo}