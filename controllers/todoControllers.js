const Todo = require("../models/TodoSchema")


/**
 * Creates a new todo and deletes the oldest 20 todos if the total number of todos exceeds 50.
 * @param {string} req.body.todo - The todo to be created.
 * @return {Promise<Object>} The response object with a success message or an error message.
 */
const postTodo = async (req, res) => {
    try {
        const { todo } = req.body
        const success = await Todo.create({ todo: todo })
        if (success) {
            const totalTodos = await Todo.countDocuments();
            if (totalTodos > 50) {
                await Todo.find()
                    .sort({ createdAt: -1 })  // Sort by oldest first
                    .limit(20)
                    .then(async (todos) => {
                        const idsToDelete = todos.map(todo => todo._id);
                        await Todo.deleteMany({ _id: { $in: idsToDelete } });
                    });
            }
            return res.status(200).send({ "massage": "Todo created...." })
        }
        return res.status(400).send({ "massage": "NOT created...." })
    } catch (err) {
        return res.status(400).send({ error: err.message })
    }
}


const updateTodo = async (req, res) => {
    try {
        const { todo } = req.body
        const success = await Todo.findByIdAndUpdate(req.params.id, { todo: todo })
        if (success) {
            res.status(200).send({ "massage": "Todo Updated...." })
        }
        res.status(400).send({ "massage": "NOT Updated...." })

    } catch (err) {
        console.log(err);
    }
}


const deleteTodo = async (req, res) => {
    try {
        const success = await Todo.findByIdAndDelete(req.params.id)
        if (success) {
            res.status(200).send({ "massage": "Todo Deleted...." })
        }
        res.status(400).send({ "massage": "NOT Deleted...." })

    } catch (err) {
        console.log(err);
    }
}


const getTodos = async (req, res) => {
    try {
        const success = await Todo.find()
        if (success) {
            res.status(200).send({ success, "massage": "ok...." })
        }
        res.status(400).send({ "massage": "NOT ok...." })
    } catch (err) {
        console.log(err);
    }
}

const getTodo = async (req, res) => {
    try {
        const success = await Todo.findById(req.params.id)
        if (success) {
            res.status(200).send({ success, "massage": "ok...." })
        }
        res.status(400).send({ "massage": "NOT ok...." })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { postTodo, updateTodo, deleteTodo, getTodos, getTodo }