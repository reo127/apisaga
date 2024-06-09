const express = require('express');
const { jokesController, quoteController } = require('../controllers/publicAPIsControllers');
const router = express.Router();

router.get("/joke", jokesController);
router.get("/quote", quoteController);


module.exports = router;