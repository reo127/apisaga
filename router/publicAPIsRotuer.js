const express = require('express');
const { jokesController, quoteController, randomProductController } = require('../controllers/publicAPIsControllers');
const router = express.Router();

router.get("/joke", jokesController);
router.get("/quote", quoteController);
router.get("/product", randomProductController);


module.exports = router;