const User = require('../models/user.model')
// ! Still need to create secret key
const secret_key = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
  registerUser: async(req, res) => {
    // Check if email entered by user already exists in DB
    try{
      const potentialUser = await User.findOne({
        email: req.body.email
      })
      // if email already exists in DB, send message asking user to login instead
      if (potentialUser) {
        res.status(400).json({message: "That email already exists. Did you mean to log in?"})
      } else {
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
      }
    }
    catch(err){

    }
  }
}