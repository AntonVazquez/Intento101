const mongoose = require('mongoose');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const User = require('../../../service/models/user');

describe('User Model', () => {
  let saveStub, compareStub, genSaltStub, hashStub;

  beforeAll(() => {
    saveStub = sinon.stub(mongoose.Model.prototype, 'save');
    compareStub = sinon.stub(bcrypt, 'compare');
    genSaltStub = sinon.stub(bcrypt, 'genSalt');
    hashStub = sinon.stub(bcrypt, 'hash');
  });

  afterAll(() => {
    saveStub.restore();
    compareStub.restore();
    genSaltStub.restore();
    hashStub.restore();
  });

  describe('Schema', () => {
    test('should have email, username, password fields', () => {
      const user = new User();

      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('password');
    });
  });

  describe('Password Hashing', () => {
    test('should hash the password before saving', async () => {
      const user = new User({
        email: 'test@test.com',
        username: 'testuser',
        password: 'testpassword',
      });

      genSaltStub.yields(null, 'salt');
      hashStub.yields(null, 'hashedpassword');
      saveStub.resolves(user);

      await user.save();

      expect(genSaltStub.calledOnce).toBeTruthy();
      expect(hashStub.calledOnce).toBeTruthy();
    });
  });

  describe('Password Verification', () => {
    test('should verify the password correctly', async () => {
      const user = new User({
        email: 'test@test.com',
        username: 'testuser',
        password: 'testpassword',
      });

      compareStub.yields(null, true);

      const isMatch = await user.comparePassword('testpassword');

      expect(isMatch).toBeTruthy();
      expect(compareStub.calledOnce).toBeTruthy();
    });
  });
});