const User = require('../models/user.model')
// only store secret key globally if used more than once
const secret_key = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

////////// * BEGIN AUTHENTICATION * //////////
module.exports.registerUser = async(req, res) => {
  // Check if email entered by user already exists in DB
  try{
    const potentialUser = await User.findOne({
      email: req.body.email
    })
    // if email already exists in DB, send message asking user to login instead
    if (potentialUser) {
      res.status(418).json({message: "I was, am, and always will be a teapot."})
    } else {
      const newUser = await User.create(req.body)

      // generate user token and store the id/email of the newly registered user
      const userToken = jwt.sign({_id: newUser._id}, secret_key, {expiresIn: '2h'})

      // sending user and cookie back to client. Cookie arguments are keyName & value to assign it, http only allowed,
      // maxAge is cookie expiration in ms.
      res.status(201).cookie('userToken', userToken, {secure: true, sameSite: 'strict', httpOnly: true, maxAge: 2 * 60 * 60 * 1000}).json(newUser)
    }
  }
  catch(err){
    res.status(400).json({error: err})
  }
}

module.exports.login = async(req,res) => {
  try{
    const getUser = await User.findOne({
      email: req.body.email
    })
    if (getUser){
      // check if password (hash) provided is equal to password (hash) in database
      const passwordsMatch = await bcrypt.compare(req.body.password, getUser.password)
      if (passwordsMatch){
        // generate user token
        // log user in
        const userToken = jwt.sign({_id: getUser._id}, secret_key, {expiresIn: '2h'})
        res.status(200).cookie('userToken', userToken, {httpOnly: true, sameSite: 'lax', maxAge: 2 * 60 * 60 * 1000}).json({message: `${getUser.firstName} ${getUser.lastName} has successfully logged in`})
      } else {
        // if user exists but passwords don't match
        res.status(400).json({message: "Invalid email or password"})
      }
    } else {
      // if user doesn't exist
      res.status(400).json({message: "Invalid email or password"})
    }
  }
  catch(err){
    res.status(400).json({error: err})
  }
}

module.exports.logout = (req, res) => {
  res.status(200).clearCookie('userToken').json({message: "Successfully logged out"})
}
////////// * END AUTHENTICATION * //////////