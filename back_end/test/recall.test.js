require('./setup');
const app = require('../src/app');
const User = require('../src/models/User');
const Category = require('../src/models/Category');
const Manufacturer = require('../src/models/Manufacturer');
const { loginTestUser, createTestUser } = require('./authHelper');

describe('Recall API', function() {
  let frontUserToken;
  let frontUserId;
  let categoryId;
  let manufacturerId;

  beforeEach(async function() {
    // Create user using proper registration
    const frontUser = await createTestUser('fuser', 'password123');
   
    
    frontUserId = frontUser._id;
  

    // Get valid tokens through login
    frontUserToken = await loginTestUser(app, 'fuser', 'password123');
 

    // Create a category  Electronics
    const category = await Category.create({
      category:"Electronics"
    });
    categoryId = category._id;
    // Create a manufacturer on   Electronics
    const manufacturer = await Manufacturer.create({
      manufacturer:"Acer"
    });
    manufacturerId = manufacturer._id;
  });

  describe('GET /api/recall/:id_manufacturer', function() {
    it('should bring recalls from manufacturer Acer', async function() {
      const res = await chai.request(app)
        .get(`/api/recall/${manufacturerId}`)
        .set('Authorization', `Bearer ${frontUserToken}`)
        .params
        .send({
          message: 'My laptop is the list :( !'
        });

      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('message');
    });

    it('should prevent self-adoption', async function() {
      const res = await chai.request(app)
        .get(`/api/recall/${categoryId}`)
        .set('Authorization', `Bearer ${frontUserToken}`)
        .send({
          message: 'Trying to consult all electronics'
        });

      expect(res).to.have.status(400);
      expect(res.body.message).to.include('Manufacturer not found');
    });

    it('should require authentication', async function() {
      const res = await chai.request(app)
        .post(`/api/recall/${manufacturerId}`)
        .send({
          message: 'No token provided'
        });

      expect(res).to.have.status(401);
    });
  });
});