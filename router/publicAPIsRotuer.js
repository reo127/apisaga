const express = require('express');
const { jokesController, quoteController, randomProductController, randomsProductsById } = require('../controllers/publicAPIsControllers');
const router = express.Router();

router.get("/joke", jokesController);
router.get("/quote", quoteController);
router.get("/product", randomProductController);
router.get("/products/:quantity", randomsProductsById);


module.exports = router;