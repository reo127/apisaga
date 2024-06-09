const express = require('express')
const router = express.Router()
const {varifJWT} = require("../middlewares/auth.middlewares")
const {registerUser, login, logout} = require("../controllers/authControllers")

router.post("/register", registerUser)
router.post("/login", login)
router.post("/logout", varifJWT, logout)

module.exports = router