const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Users = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}
router.get('/', async (req, res) => {
    try
    {const users = await Users.find({}).sort({createdAt: -1})
    res.json(users)}
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User not found"})
    }
    try{
        const user = await Users.findById(id)
        res.status(200).json(user)
    }
    catch(error){
        res.status(404).json({message: "User not found"})
    }
})
router.post('/', async (req, res) => {
    const {username, password} = req.body
    const exists = await Users.findOne({username})
    if(exists){
        return res.status(400).json({message: "User already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    try{
        const user = await Users.create({username, password: hashedPassword})
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error.message)
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User not found"})
    }
    const update = await Users.findOneAndUpdate({_id: id}, {...req.body})
    try{
        res.status(200).json({message: "User updated"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "User not found"})
    }
    try{
        const del = await Users.findOneAndDelete({_id: id})
        res.status(200).json({message: "User deleted"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/login', async (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: "Please enter all fields"})
    }
    const user = await Users.findOne({username: req.body.username})
    if(!user){
        return res.status(400).json({message: "User does not exist"})
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match){
        return res.status(400).json({message: "Invalid credentials"})
    }
    const token = createToken(user._id)
    return res.status(200).json({user, token})
})
module.exports = router
