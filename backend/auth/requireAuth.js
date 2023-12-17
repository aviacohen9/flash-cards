const jwt = require('jsonwebtoken')
const User = require('./userModel')

const requireAuth = async (req, res, next) => {
  console.log('----------requireAuth-----------')
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  //console.log(authorization)
  const token = authorization.split(' ')[1]//.substring(1, authorization.split(' ')[1].length-2)
  
  /*
  console.log(token)
  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    console.log(user)
    next()
  })*/


  
  try {
    //console.log('token: '+token+ ' key is: '+ process.env.SECRET)
    //console.log(req.headers)
    var decodedSecret = Buffer.from(process.env.SECRET, 'base64');

    const { _id } = jwt.verify(token, process.env.SECRET);
    
    //console.log(_id)
    req.user = await User.findOne({ _id }).select('_id')
    //console.log(req.user)
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth