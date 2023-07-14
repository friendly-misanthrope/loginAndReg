const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minLength: [2, 'First name must be at least 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minLength: [2, 'Last name must be at least 2 characters']
  },
  email: {
    type: String,
    required:[true, 'Email is required'],
    validate: [isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters']
  }
}, {timestamps: true})

// * Middleware

// adds in temporary virtual 'confirm password' field,
// as it doesn't need to be permanently stored.
UserSchema.virtual('confirmPassword')
  // GET confirmPassword field
  .get(() => this.confirmPassword)
  // SET confirmPassword field
  .set((value) => this.confirmPassword = value)

// PREvious to saving anything in database
// Takes 2 arguments: when we want it to run, in this case
// previous to validating, and the function to run
UserSchema.pre('validate', function(next){
  if (this.password !== this.confirmPassword){
    this.invalidate('confirmPassword', 'Passwords must match')
  }
  // if passwords DO match, call next() to continue code execution
  next()
})

// Prior to saving user in DB, hash the password overwrite the password field
// with the hashed password.
UserSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;