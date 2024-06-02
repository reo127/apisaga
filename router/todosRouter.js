const express = require('express')
const { postTodo, updateTodo, deleteTodo, getTodo } = require('../controllers/todoControllers')
const router = express.Router()


router.post('/createtodo', postTodo)
router.put('/updatetodo/:id', updateTodo)
router.delete('/deletetodo/:id', deleteTodo)
router.get('/alltodos', getTodo)

module.exports = router