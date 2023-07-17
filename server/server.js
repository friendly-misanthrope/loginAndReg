const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./config/mongoose.config')

// allows us to access .env variables
require('dotenv').config()

// * Middleware
app.use(express.json(), express.urlencoded({extended: true}))
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(cookieParser())

const UserRoutes = require('./routes/user.routes')
UserRoutes(app)

app.listen(8000, () => console.log("Express server now running on Port 8000"))