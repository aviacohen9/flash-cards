const mongoose = require('mongoose');
const { isEmail } = require('validator');   // isEmail method extracted from npm package called validator
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

/*
// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();                                           //we always have to do that (invoke next()) at the end of anny kind of monggose middleware or hook
});
*/





// static method to log the user in
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
  /*
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);   //return true/false
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
  */
};


// static method to sign up a new user 
userSchema.statics.signup = async function(email, password, firstName, lastName) {                       // WE CAN'T USE userSchema.statics.signup = async (email, password) => {
  //validation                                                                                   //Otherwise we couldn't use the this key word
  if(!email || !password){
    throw Error('All fields must be filled')
  }
  /*if(!validator.isStrongPassword()){
    throw Error('Password not strong enough')
  }*/

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, firstName, lastName })

  return user
}


const User = mongoose.model('user', userSchema);

module.exports = User;