const express = require('express')
const { postTodo, updateTodo, deleteTodo, getTodo } = require('../controllers/todoControllers')
const router = express.Router()


router.post('/posttodo/:todo', postTodo)
router.put('/updatetodo/:id/:updatedtodo', updateTodo)
router.delete('/tododeleted/:id', deleteTodo)
router.get('/gettodo', getTodo)

module.exports = router