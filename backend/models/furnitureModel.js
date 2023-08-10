const mongoose = require('mongoose')
const furnitureSchema = mongoose.Schema({
    name:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    },
    image:{
        required: true,
        type: String
    },
    description:{
        required: true,
        type: String
    }
})
module.exports = mongoose.model('Furniture', furnitureSchema)