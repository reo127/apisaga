const express = require('express')
const { jokesController } = require('../controllers/publicAPIsControllers')
const router = express.Router()

router.get("/", jokesController)


module.exports = router