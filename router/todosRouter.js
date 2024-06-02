const express = require('express')
const { postTodo, updateTodo, deleteTodo, getTodos, getTodo } = require('../controllers/todoControllers')
const router = express.Router()


router.post('/createtodo', postTodo)
router.put('/updatetodo/:id', updateTodo)
router.delete('/deletetodo/:id', deleteTodo)
router.get('/alltodos', getTodos)
router.get('/gettodo/:id', getTodo)

module.exports = router