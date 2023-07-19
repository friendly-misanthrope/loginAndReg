const https = require('https');
const fs = require('fs');
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('./config/mongoose.config')

// allows us to access .env variables
require('dotenv').config()

// * Middleware
app.use(express.json(), express.urlencoded({extended: true}))
app.use(cors({credentials:true, origin: 'https://localhost:3000'}))
app.use(cookieParser())

const UserRoutes = require('./routes/user.routes')
UserRoutes(app)

// app.listen(8000, () => console.log("Express server now running on Port 8000"))

https
  .createServer({
    key: fs.readFileSync("rootCA-key.pem"),
    cert: fs.readFileSync("rootCA.pem")
  }, app)
      .listen(8000, () => {
        console.log("HTTPS Express server running on port 8000")
      })