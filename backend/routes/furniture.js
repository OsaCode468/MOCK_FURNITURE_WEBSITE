const express = require('express')
const router = express.Router()
const Furniture = require('../models/furnitureModel')
const mongoose = require('mongoose')
// const requireAuth = require('../middleware/authorization')
// router.use(requireAuth)
router.get('/', async (req, res) => {
    try {
        const furnitures = await Furniture.find({}).sort({createdAt:-1})
        res.status(200).json(furnitures)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    console.log(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Furniture not found"})
    }
    const furniture = await Furniture.findById(id)
    if(!furniture){
        return res.status(404).json({message:"Furniture not found"})
    }
    res.status(200).json(furniture)
})
router.post('/', async (req, res) => {
    const {name, price, image, description} = req.body
    try{
        const furniture = await Furniture.create({name, price, image, description})
        res.status(200).json({message:"Furniture created"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Furniture not found"})
    }
    const furniture = await Furniture.findOneAndUpdate({_id:id}, {...req.body})
    if(!furniture){
        return res.status(404).json({message:"Furniture not found"})
    }
    return res.status(200).json({message: "Furniture updated"})
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"Furniture not found"})
    }
    const furniture = await Furniture.findOneAndDelete({_id:id})
    if(!furniture){
        return res.status(404).json({message:"Furniture not found"})
    }
    res.status(200).json({message:"Furniture deleted"})
})
module.exports = router