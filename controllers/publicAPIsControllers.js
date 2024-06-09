const jokes = require("../json/jokes.json")

const jokesController = (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        res.status(200).json(jokes[randomIndex] )
    } catch (error) {
        res.status(400).json(error.message || "something wrond")
    }
}

module.exports = {jokesController}