let express = require('express'),
app = express(),
port = process.env.PORT || 8888,
mongoose = require('mongoose'),
Movie = require('./api/models/MovieModel'), //created model loading here
Seat = require('./api/models/SeatModel'), //created model loading here
Hall = require('./api/models/HallModel'), //created model loading here
Ticket = require('./api/models/TicketModel'), //created model loading here
User = require('./api/routes/UserRoute'), //created model loading here
logger = require('morgan'),
cors = require('cors'),
jwt = require('jsonwebtoken'),
env = require('dotenv').config();
bodyParser = require('body-parser');

app.set('secretKey', 'nodeRestApi'); // jwt secret token

exports.validateUser = function (req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, 
  (req, res) => {
    console.log('DB Connected!')
  }
); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('short'))
app.use(cors())

app.get('/', function(req, res){
  res.json({"message" : "Hello welcome to movie theatre API"});
});

app.use('/users', User);

let movie_routes = require('./api/routes/MovieRoute'); //importing route
movie_routes(app); //register the route

let seat_routes = require('./api/routes/SeatRoute'); //importing route
seat_routes(app); //register the route

let hall_routes = require('./api/routes/HallRoute'); //importing route
hall_routes(app); //register the route

let ticket_routes = require('./api/routes/TicketRoute'); //importing route
ticket_routes(app); //register the route

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
     err.status = 404;
     next(err);
 });
 // handle errors
 app.use(function(err, req, res, next) {
  console.log(err);
  
   if(err.status === 404)
    res.status(404).json({message: req.originalUrl + " Not found"});
   else 
     res.status(500).json({message: "Something looks wrong :( !!! You need to login first."});
 });

app.listen(port);


console.log('movie theatre RESTful API server started on: ' + port);