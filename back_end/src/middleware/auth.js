// Replace this file with custom middleware functions, including authentication and rate limiting
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {


  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');


    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('User from token:', error);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = authenticate;