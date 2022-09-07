const { Schema, model } = require('mongoose')

const User = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, require: true },
    name: String
}, { versionKey: false })

module.exports = model('User', User)