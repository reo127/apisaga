const express = require('express')
const router = express.Router()
const {getUserData} = require("../controllers/authControllers")

router.get("/", getUserData)

module.exports = router