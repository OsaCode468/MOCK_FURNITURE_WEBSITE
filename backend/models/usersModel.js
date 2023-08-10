const mongoose = require('mongoose')
const usersSchema = mongoose.Schema({
    username:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String,
    }
})
module.exports = mongoose.model('Users', usersSchema)