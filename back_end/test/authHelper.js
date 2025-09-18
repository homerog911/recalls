
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');

const generateTestToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const createTestUser = async (username, password) => {
  return await User.create({ username, password });
};

const loginTestUser = async (app, username, password) => {
  const res = await chai.request(app)
    .post('/api/auth/login')
    .send({ username, password });
  
  return res.body.token;
};

module.exports = { generateTestToken, createTestUser, loginTestUser };