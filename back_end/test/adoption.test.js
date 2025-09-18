require('./setup');
const app = require('../src/app');
const User = require('../src/models/User');
const Dog = require('../src/models/Dog');
const { loginTestUser, createTestUser } = require('./authHelper');

describe('Adoption API', function() {
  let ownerToken, adopterToken;
  let ownerId, adopterId;
  let dogId;

  beforeEach(async function() {
    // Create owner and adopter users using proper registration
    const owner = await createTestUser('owner', 'password123');
    const adopter = await createTestUser('adopter', 'password123');
    
    ownerId = owner._id;
    adopterId = adopter._id;

    // Get valid tokens through login
    ownerToken = await loginTestUser(app, 'owner', 'password123');
    adopterToken = await loginTestUser(app, 'adopter', 'password123');

    // Create a dog for adoption
    const dog = await Dog.create({
      name: 'Buddy',
      description: 'Friendly dog',
      owner: ownerId
    });
    dogId = dog._id;
  });

  describe('POST /api/adoptions/:id', function() {
    it('should allow adoption of available dog', async function() {
      const res = await chai.request(app)
        .post(`/api/adoptions/${dogId}`)
        .set('Authorization', `Bearer ${adopterToken}`)
        .send({
          message: 'Thank you for this wonderful dog!'
        });

      expect(res).to.have.status(201);
      expect(res.body.data).to.have.property('message');
    });

    it('should prevent self-adoption', async function() {
      const res = await chai.request(app)
        .post(`/api/adoptions/${dogId}`)
        .set('Authorization', `Bearer ${ownerToken}`)
        .send({
          message: 'Trying to adopt my own dog'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.include('Cannot adopt your own dog');
    });

    it('should require authentication', async function() {
      const res = await chai.request(app)
        .post(`/api/adoptions/${dogId}`)
        .send({
          message: 'No token provided'
        });

      expect(res).to.have.status(401);
    });
  });
});