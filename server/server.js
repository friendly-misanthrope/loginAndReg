const express = require('express')
const app = express()

require('./config/mongoose.config')

// allows us to access .env variables
require('dotenv').config()

// * Middleware
app.use(express.json(), express.urlencoded({extended: true}))

const UserRoutes = require('./routes/user.routes')
UserRoutes(app)

app.listen(8000, () => console.log("Express server now running on Port 8000"))