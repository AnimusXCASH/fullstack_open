const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
require('express-async-errors')
const assert = require('node:assert')
const app = require('../app')
const Blogs = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Blogs.insertMany(blogs);
});

// 4.8
test('correct amount of blog entries returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, blogs.length, 'The number of blogs returned should match the number of blogs inserted');
});

// 4.9
test('unique identifier property of the blog post is id ', async () => {
  const response = await api.get('/api/blogs');
  assert.ok(response.body.every(blog => blog.id && !blog._id), 'Every blog post should have an id propert and not _id default by mongo')
})

// 4.10
test('HTTP post request to /api/blogs creates new blog post', async () => {
  const newBlog = {
    title: "Testing new blo",
    author: "Animus",
    url: "https://www.animus.com/",
    likes: 10,
  }

  // Make a post to server
  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  // Get all blogs 
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogs.length + 1, 'The number of blogs should increase by 1')

  // Check content
  const titles = response.body.map(blog => blog.title);
  assert.ok(titles.includes(newBlog.title), 'The new blog title should be in database')
})

// 4.11 
test('Default likes to 0 if missing', async () => {
  const newBlog = {
    title: "Likes missing",
    author: "Animus",
    url: "https://www.animus.com/",
  }

  await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);

  // get the blog to check the likes 
  const response = await api.get('/api/blogs');
  const addedBlog = response.body.find(blog => blog.title === newBlog.title);
  assert.strictEqual(addedBlog.likes, 0, "Likes should default to 0")
})


// 4.12
test('Post without tile should return 400 Bad request stats', async () => {
  const newBlog = {
    author: "Author Name",
    url: "http://example.com",
    likes: 2
  };

  const response = await api.post('/api/blogs').send(newBlog).expect(400);
  assert.strictEqual(response.body.error, 'Title and URL are required', 'Response should have error message for missing title');
});

// 4.12
test('POST without url returns status 400 Bad Request', async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Author Name",
    likes: 2
  };

  const response = await api.post('/api/blogs').send(newBlog).expect(400);

  assert.strictEqual(response.body.error, 'Title and URL are required', 'Response should have error message for missing url');
});


//4.13 
test('Blog can be deleted', async () =>{
  const allBlogs = await Blogs.find({})
  const chosenBlog = allBlogs[0]

  await api.delete(`/api/blogs/${chosenBlog._id}`).expect(204);

  const allBlogsAfterDeletion = await Blogs.find({});
  const titles = allBlogsAfterDeletion.map(r => r.title);

  assert.strictEqual(titles.includes(chosenBlog.title), false, 'Deleted blog not found in database')
})

//4.14 
test('Blog post can be updated', async () => {
  const allBlogs = await Blogs.find({});
  const selectedBlog = allBlogs[0];

  const updatedBlogData = {
    likes: selectedBlog.likes + 1
  };

  const updateResponse = await api.put(`/api/blogs/${selectedBlog._id}`).send(updatedBlogData);
  assert.strictEqual(updateResponse.status, 200, 'Should return status 200');

  const updatedBlog = await Blogs.findById(selectedBlog._id);
  assert.strictEqual(updatedBlog.likes, selectedBlog.likes + 1, 'Likes should be incremented by 1');
});


// Required to closec onneciton everytime
after(async () => {
  await mongoose.connection.close()
})


// https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12
