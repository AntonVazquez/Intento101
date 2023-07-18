const request = require('supertest');
const express = require('express');
const userController = require('../../../service/controllers/userController');
const User = require('../../../service/models/user');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.post('/users/register', userController.registerUser);

jest.mock('../src/models/user', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue(true)
    };
  });
});

jest.mock('bcryptjs', () => {
  return {
    hash: jest.fn().mockResolvedValue('hashed_password')
  };
});

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should register a user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'testpassword'
    };

    const res = await request(app)
      .post('/users/register')
      .send(userData);

    expect(User).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@test.com',
      password: 'hashed_password'
    });

    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toBe('/users/login');
  });
});
