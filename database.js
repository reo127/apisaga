const mongoose = require('mongoose')

const database = async() => {
    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=> console.log('database connected...')).catch((err) => {console.log(err)})
    } catch (err) {
        console.log(err);
    }
}

module.exports = database