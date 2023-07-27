const mongoose = require('mongoose')
const furnitureSchema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    }
})
module.exports = mongoose.model('Furniture', furnitureSchema)