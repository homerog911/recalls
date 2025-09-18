require('./setup');
const app = require('../src/app');
const User = require('../src/models/User');
const Dog = require('../src/models/Dog');
const { loginTestUser, createTestUser } = require('./authHelper');

describe('Dog API', function() {
  let token;
  let userId;

  beforeEach(async function() {
    // Create user using the model directly to ensure proper password hashing
    const user = await createTestUser('testuser', 'password123');
    userId = user._id;
    
    // Login to get a valid token
    token = await loginTestUser(app, 'testuser', 'password123');
  });

  describe('POST /api/dogs', function() {
    it('should create a new dog', async function() {
      const res = await chai.request(app)
        .post('/api/dogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Buddy',
          description: 'Friendly golden retriever'
        });

      expect(res).to.have.status(201);
      expect(res.body.data).to.have.property('name', 'Buddy');
      expect(res.body.data.owner).to.equal(userId.toString());
    });

    it('should require authentication', async function() {
      const res = await chai.request(app)
        .post('/api/dogs')
        .send({
          name: 'Buddy',
          description: 'Friendly golden retriever'
        });

      expect(res).to.have.status(401);
    });
  });

  describe('GET /api/dogs/my-dogs', function() {
    it('should get user dogs with pagination', async function() {
      // Create test dogs associated with the user
      await Dog.create([
        { name: 'Dog1', description: 'Desc1', owner: userId },
        { name: 'Dog2', description: 'Desc2', owner: userId }
      ]);

      const res = await chai.request(app)
        .get('/api/dogs/my-dogs?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.data).to.have.lengthOf(2);
      expect(res.body.pagination).to.have.property('total', 2);
    });
  });
});