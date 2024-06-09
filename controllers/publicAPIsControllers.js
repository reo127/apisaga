const jokes = require("../json/jokes.json");
const quotes = require("../json/quotes.json");
const products = require("../json/products.json");

const jokesController = (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        res.status(200).json(jokes[randomIndex])
    } catch (error) {
        res.status(400).json(error.message || "something wrond");
    }
}

const quoteController = (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        res.status(200).json(jokes[randomIndex])
    } catch (error) {
        res.status(400).json(error.message || "something wrond");
    }
}


const randomProductController = async(req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * products.length);
        res.status(200).json(products[randomIndex])
    } catch (error) {
        res.status(400).json(error.message || "something wrond");
    }
}

module.exports = { jokesController, quoteController, randomProductController };