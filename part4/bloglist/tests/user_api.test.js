const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');

const { BCRYPT_SALT_OR_ROUNDS } = require('../utils/config');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  await new User({
    username: 'azurediamond',
    name: 'AzureDiamond',
    passwordHash: await bcrypt.hash('hunter2', BCRYPT_SALT_OR_ROUNDS),
  }).save();
});

describe('creating a user', () => {
  test('succeeds with a unique username', async () => {
    const initialCount = await User.countDocuments();

    const newUser = {
      username: 'cthon98',
      name: 'Cthon98',
      password: '*******',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(await User.countDocuments()).toEqual(initialCount + 1);
    expect(await User.exists({ username: newUser.username })).not.toBeNull();
  });
});

afterAll(() => mongoose.connection.close());
