const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    }
}) // userSchema

let User = mongoose.model('User', userSchema)

module.exports = User