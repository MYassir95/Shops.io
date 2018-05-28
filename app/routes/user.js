// Dependencies
import jwt from 'jsonwebtoken';
import moment from 'moment';
// We import the User model we have just defined
import User from '../models/user';
// The config file contains the secret to sign the token
import config from '../../config';

// Utility function to create and return the token, it requires TOKEN_SECRET from config
const createToken = name => {
  var payload = {
    sub: name,
    exp: moment().add(1, 'day').unix()
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
}

// signup function for the /auth/signup route
const signup = (req, res) => {
  // query the database to make sure the e-mail is not taken already
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
    // HTTP 409 status is sent in case the e-mail is taken
      return res.status(409).json({ message: 'Email is already taken' });
    }

    // A new user is created with the information sent by the client
    const user = Object.assign(new User(), req.body);
    user.save((err, result) => {
      if (err) {
        res.send(err);
      }
      // Notice we also send the token as we want the user to be immediately logged in
      res.json({
        message: 'Welcome to Shops.io, you are now logged in',
        token: createToken(result.email),
        id: result._id
      });
    });
  });
};

// Login function for /auth/login
const login = (req, res) => {
  // Query the database for user with that specific e-mail
  User.findOne({ email: req.body.email }, '+password', (err, user) => {
    if (!user) {
    // If the user doesn't exist just send a HTTP 401 status
      return res.status(401).json({ message: 'Invalid email/password' });
    }
    /* If the user exists, the password sent by the client is compared with the one in the db
    with the utilily function comparePwd
   */
    user.comparePwd(req.body.password, (err, isMatch) => {
      if (!isMatch) {
    // In case of wrong password, we send another HTTP 401 status
        return res.status(401).json({ message: 'Invalid email/password' });
      }
      // Correct information from the client, a token is sent
      res.json({ message: 'You are now logged in', token: createToken(user.email), id: user._id });
    });
  });
};

// Export the functions for server.js
export {
  signup,
  login
};
