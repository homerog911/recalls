require('./setup');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth API', function() {
  describe('POST /api/auth/register', function() {
    it('should register a new user', async function() {
      const res = await chai.request(app)
        .post('/api/auth/register')
        .send({
          username: 'Usuario Test',
          email: 'usertest@gmail.com',
          password: 'password123*'
        });

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token');
      expect(res.body.user).to.have.property('username', 'testuser');
    });

    it('should not register duplicate username', async function() {
      await User.create({ username: 'existing', email: 'existing', password: 'password' });
      
      const res = await chai.request(app)
        .post('/api/auth/register')
        .send({
          username: 'Usuario Test',
          email: 'usertest@gmail.com',
          password: 'password123'
        });

      expect(res).to.have.status(400);
    });
  });

  describe('POST /api/auth/login', function() {
    beforeEach(async function() {
      await User.create({ username: 'testuser',  email: 'existing', password: 'password123' });
    });

    it('should login existing user', async function() {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send({
           email: 'usertest@gmail.com',
          password: 'password123'
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
    });

    it('should reject invalid credentials', async function() {
      const res = await chai.request(app)
        .post('/api/auth/login')
        .send({
           email: 'usertest@gmail.com',
          password: 'wrongpassword'
        });

      expect(res).to.have.status(401);
    });
  });
});