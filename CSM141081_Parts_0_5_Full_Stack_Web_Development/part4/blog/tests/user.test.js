const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const User = require('../models/user');
const helper = require('../utils/test_helper');
const bcrypt = require('bcryptjs');
const app = require('../app');

const api = supertest(app);


describe('when there is initialy one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'rootname', passwordHash, blogs: [] })
    await user.save()
  })

  test('Simple connectivity test to user route', async () => {
    const response = await api.get('/api/users').expect(200);
    assert.strictEqual(response.status, 200, "Status code is not 200");
    assert(Array.isArray(response.body), "Response body should be an array");
  });

  

  test('HTTP Post user creation with fresh username success', async () => {
    console.log("HTTP Post user creation with fresh username success")
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username), 'Username should be entered')
  })

  test('Creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('Username must be unique'), "Error message does not include the expected text");
    assert.strictEqual(usersAtEnd.length, usersAtStart.length, 'Number of users stored unchanged')
  })

  // // Test 16

  test('creation fails if the username or password is missing', async () => {
    const newUser = {
      username: '',
      password: 'pass'
    }

    const results = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    assert(results.body.error = 'Username and password are required', "Error message should indicate missing username or password")
  })

  test('creation fails if the username or password is to short', async () => {
    const newUser = {
      username: 'ab',
      password: '12'
    }

    const results = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    assert(results.body.error = 'Username and password must be at least 3 characters long', "Error message should indicate username or password is too short")
  })

})

// Required to closec onneciton everytime
after(async () => {
  await mongoose.connection.close();
});