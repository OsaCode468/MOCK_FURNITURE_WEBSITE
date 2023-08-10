const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    cartItems: [
        {product: {type: mongoose.Schema.Types.ObjectId, ref: "Furniture"}},
    ]
})
module.exports = mongoose.model('Cart', cartSchema)