require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/mongoConnect')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const app = express()

// Connect to mongoDB
connectDB()

// Middleware for json, cookie, cors
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// Open event equivalent connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})
