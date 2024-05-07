const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blogs = require('../models/blog')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const blogs = [
  {
    title: 'Blog to update',
    author: 'Animus',
    url: 'https://www.example.com/new-blog',
    likes: 0
  },
  {
    title: 'Blog to update 2',
    author: 'Animus',
    url: 'https://www.example.com/new-blog',
    likes: 10
  }
  // {
  //   _id: "5a422a851b54a676234d17f7",
  //   title: "React patterns",
  //   author: "Michael Chan",
  //   url: "https://reactpatterns.com/",
  //   likes: 7,
  //   __v: 0
  // },
  // {
  //   _id: "5a422aa71b54a676234d17f8",
  //   title: "Go To Statement Considered Harmful",
  //   author: "Edsger W. Dijkstra",
  //   url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  //   likes: 5,
  //   __v: 0
  // },
  // {
  //   _id: "5a422b3a1b54a676234d17f9",
  //   title: "Canonical string reduction",
  //   author: "Edsger W. Dijkstra",
  //   url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  //   likes: 12,
  //   __v: 0
  // },
  // {
  //   _id: "5a422b891b54a676234d17fa",
  //   title: "First class tests",
  //   author: "Robert C. Martin",
  //   url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  //   likes: 10,
  //   __v: 0
  // },
  // {
  //   _id: "5a422ba71b54a676234d17fb",
  //   title: "TDD harms architecture",
  //   author: "Robert C. Martin",
  //   url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  //   likes: 0,
  //   __v: 0
  // },
  // {
  //   _id: "5a422bc61b54a676234d17fc",
  //   title: "Type wars",
  //   author: "Robert C. Martin",
  //   url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  //   likes: 2,
  //   __v: 0
  // }
]

let token;

describe('Testing the blog functionality', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blogs.deleteMany({});
    await Blogs.insertMany(blogs)
    const passwordHash = await bcrypt.hash('testpassword', 10);
    const user = new User({
      username: 'testuser',
      name: 'Test User',
      passwordHash
    });
    await user.save();

    const response = await api.post('/api/login').send({
      username: 'testuser',
      password: 'testpassword'
    });
    token = response.body.token;

  })

  // // 4.9
  test('HTTP Get request to check unique identifier property of the blog post is id ', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`);
    assert.ok(response.body.every(blog => blog.id && !blog._id), 'Every blog post should have an id propert and not _id default by mongo')
  })

  // 4.10
  test('HTTP Get request to check correct amount of blog entries returned', async () => {
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`);
    console.log(response.body)
    assert.strictEqual(response.body.length, blogs.length, 'The number of blogs returned should match the number of blogs inserted');
  });

  // 4.11 
  test('Http post default likes to 0 if missing', async () => {
    const newBlog = {
      title: "Likes missing",
      author: "Animus",
      url: "https://www.animus.com/",
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);

    // get the blog to check the likes 
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`);
    const addedBlog = response.body.find(blog => blog.title === newBlog.title);
    assert.strictEqual(addedBlog.likes, 0, "Likes should default to 0")
  })



  test('HTTP post request to create new blog post', async () => {
    const newBlog = {
      title: "Testing new blog",
      author: "Test User",
      url: "https://www.animus.com/",
      likes: 10,
    }

    // Make a post to server
    const postResponse = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);
    assert.strictEqual(postResponse.status, 201, "Blog creation should return status 201");

    // Get all blogs 
    const getResponse = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`);
    assert.strictEqual(getResponse.status, 200, "Fetching blogs should return status 200");
    assert.strictEqual(getResponse.body.length, blogs.length + 1, 'The number of blogs should increase by 1');

    // Check content
    const titles = getResponse.body.map(blog => blog.title);
    assert.ok(titles.includes(newBlog.title), 'The new blog title should be in database')

  })

  // // 4.12
  test('HTTP Post without title should return 400 Bad request stats', async () => {
    const newBlog = {
      author: "Author Name",
      url: "http://example.com",
      likes: 2
    };

    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.error, 'Title and URL are required', 'Response should have error message for missing title');
  });

  // // 4.12
  test('HTTP POST without url returns status 400 Bad Request', async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Author Name",
      likes: 2
    };

    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400).expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.error, 'Title and URL are required', 'Response should have error message for missing url');
  });



  test('HTTP post request a blog fails without authentication', async () => {
    const newBlog = {
      title: "Unauthorized Test Blog",
      url: "https://unauthorized.example.com",
      likes: 5
    };

    // Attempt to create blog post without Authorization header
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(401);  // Expecting a 401 Unauthorized response

    // Additional assertion to confirm the response includes an error message
    assert.strictEqual(response.body.error, 'token missing', 'Response should indicate missing token');
  });

  // 4.13 
  test('HTTP delete request for blog to be deleted', async () => {
    const newBlog = {
      title: "Test Blog for Deletion",
      url: "https://example.com",
      likes: 1
    };

    // Create blog post
    const createResponse = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);
    const createdBlogId = createResponse.body.id;

    // // Delete the created blog
    await api.delete(`/api/blogs/${createdBlogId}`).set('Authorization', `Bearer ${token}`).expect(204);

    const getResponse = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`).expect(200);
    assert.strictEqual(getResponse.body.find(blog => blog._id === createdBlogId), undefined, 'Deleted blog should not be found');
  });

  //4.14 
  test('HTTP Put blog post can be updated', async () => {

    const newBlog = {
      title: 'Blog to update',
      author: "Test User",
      url: 'https://www.example.com/new-blog',
      likes: 0
    }


    const creationResponse = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/);
    const createdBlogId = creationResponse.body.id;

    const updatedBlogData = {
      likes: 10
    }

    const updateResponse = await api.put(`/api/blogs/${createdBlogId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlogData)
      .expect(200);

    assert.strictEqual(updateResponse.status, 200, 'Should return status 200');
    assert.strictEqual(updateResponse.body.likes, 10, 'Likes should be updated to 10');
  });
})


// Required to closec onneciton everytime
after(async () => {
  await mongoose.connection.close();
});

