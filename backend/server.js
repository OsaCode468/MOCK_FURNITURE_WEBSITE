require('dotenv').config()
const cors = require('cors')

const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(cors())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
const furnitureRoutes = require('./routes/furniture')
const userRoutes = require('./routes/users')
const cartRoutes = require('./routes/cart')
app.use(express.json())
app.use('/api/furniture', furnitureRoutes)
app.use('/api/users', userRoutes)
app.use("/api/cart", cartRoutes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})
mongoose.connect(process.env.MONG_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err))
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the furniture  fullstack application.' })
})
app.listen(process.env.PORT, () => console.log('Server running on port 4000'))