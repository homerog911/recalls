process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'your secret jwt';
process.env.MONGODB_URI = 'mongodb+srv://youruser:yuorpass@serv';
process.env.DATA_BASE = 'my-recall-test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

before(async function() {

  this.timeout(10000);
  // Connect to test database

   await mongoose.connect(process.env.MONGODB_URI+'/'+process.env.DATA_BASE);
   
});

after(async function() {
  // Clean up and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async function() {
  // Clean up collections after each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});

global.expect = expect;
global.chai = chai;