const Cart = require('../models/cartModels.js')
const Furniture = require('../models/furnitureModel.js')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/authorization')
router.use(requireAuth)
router.get('/', async (req, res) => {
    try{
        const cart = await Cart.find({}).sort({createdAt: -1})
        res.json(cart)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}).get('/:id', async (req, res) => {
    const cart = await Cart.findOne({user: req.params.id})
    if(cart){
        res.status(200).json(cart)
    }
    else{
        return res.status(400).json({message: "Cart not found"})
    }
})
router.post('/', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            // If the cart exists, add the product to cartItems
            cart.cartItems.push({ product:req.body.productId});
            await cart.save();
            return res.status(201).json({ message: "Item added to cart successfully." });
        } else {
            // If the cart doesn't exist, create a new cart and add the product
            const newCart = new Cart({
                user: req.user._id,
                cartItems: [{ product: req.body.productId }]
            });
            await newCart.save();
            return res.status(201).json({ message: "Item added to cart successfully." }); 
        }

        console.log("Item added to cart successfully.");
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
})
router.delete('/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const productIdToRemove = req.params.productId;
        cart.cartItems = cart.cartItems.filter(item => item.product && item.product.toString() !== productIdToRemove);

        await cart.save();

        res.status(200).json({ message: "Item removed from cart successfully." });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
module.exports = router