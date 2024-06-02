const express = require('express')
const { postTodo, updateTodo, deleteTodo, getTodo } = require('../controllers/todoControllers')
const router = express.Router()


router.post('/posttodo', postTodo)
router.put('/updatetodo/:id', updateTodo)
router.delete('/tododeleted/:id', deleteTodo)
router.get('/gettodo', getTodo)

module.exports = router