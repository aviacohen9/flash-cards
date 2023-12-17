const User = require('./userModel');
const jwt = require('jsonwebtoken');





// create json web token
const time = '3d';        //3 days that this jwt is going to stay valid for

const createToken = (_id) => {
  console.log(_id)
  _id = _id.toString().replace(/ObjectId\("(.*)"\)/, "$1")
  console.log(_id)
  return jwt.sign(
     {_id},
    process.env.SECRET,
    {}
  );
};

/*const createToken = (_id) => {
  return jwt.sign(
    { _id },
    process.env.SECRET,
    {expiresIn: time}
  );
}; */


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  
  // incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000 || err.message==='Email already in use') {
    errors.email = 'That email is already registered';
    return errors;
  }

 
  // validation errors
  if (err.message.includes('User validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
  });

    if(err.message){
      errors.email = err.message
      errors.password = err.message
    }
  }

  return errors;
}



// controller actions
// sign up POST
module.exports.signup_post = async (req, res) => {
  console.log(req.body)
  const { email, password, firstName, lastName } = req.body

  try {

    const user = await User.signup(email, password, firstName, lastName)
    console.log(user)
    
    // create a token
    const token = createToken(user._id);
    
    console.log(token)
    res.status(200).json({token, firstName: user.firstName})
  } catch (error) {
    //console.log(error)
    const errors = handleErrors(error);
    res.status(400).json({errors})
  }
}

// log in POST
module.exports.login_post = async (req, res) => {
  
  const {email, password} = req.body

  try {

    //extract user from db
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    console.log(token)
    res.status(200).json({ token, firstName: user.firstName })
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors)
    res.status(400).json({errors})
  }
}

