const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');

require('dotenv').config()

//const { requireAuth, checkUser } = require('./middleware/requireAuth');
const authRoutes = require('./auth/authRoutes');
const cardRoutes = require('./cards/cardRoutes');


//express app 
const app = express();


// middleware
//app.use(express.static('public'));
app.use(express.json());    //any request that comes in it looks if it has some body to the request so some data that we're sending to the server and if it does
                            //it passes it and attaches it to the request object so we can access it in the request handler (allows us to access req.body)
app.use(cors({withCredentials: true, Origin: true,})); 
app.use(cookieParser());


app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next();
})
  
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");    //res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// listen for request + database connection 
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true/*, useCreateIndex:true*/ })
    .then((result) => app.listen(process.env.PORT))
    .then(() => console.log( 'Listening on port '+process.env.PORT+'. Database Connected.  ' ))
    .catch((err) => console.log(err));


// routes
app.use(authRoutes);
app.use('/cards',cardRoutes);



//export default app 