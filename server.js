import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// We gotta import our models and routes
import Shop from './app/models/shop';
import { getNearbyShops, getPreferredShops, likeShop, dislikeShop, removeShop } from './app/routes/shop';
import { signup, login, verifyAuth } from './app/routes/user';

const app = express(); // Our express server!
const port = process.env.PORT || 8080;

// DB connection through Mongoose
const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
}; // Just a bunch of options for the db connection
mongoose.Promise = global.Promise;
// Don't forget to substitute it with your connection string
mongoose.connect('YOUR_CONNECTION_STRING', options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API routes

// login route
app.post('/auth/login', login);

// signup route
app.post('/auth/signup', signup);

// get all nearby shops
app.get('/nearbyShops', getNearbyShops);

// get preferred shops
app.get('/preferredShops', getPreferredShops);

// like a shop
app.post('/like', likeShop);

// dislike a shop
app.post('/dislike', dislikeShop);

// remove a shop from preferred shops
app.delete('/remove', removeShop);

// ...For all the other requests just sends back the Homepage
app.route("*").get((req, res) => {
  res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`listening on port ${port}`);