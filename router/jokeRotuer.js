const express = require('express')
const { jokesController } = require('../controllers/jokeControllers')
const router = express.Router()

router.get("/", jokesController)


module.exports = router