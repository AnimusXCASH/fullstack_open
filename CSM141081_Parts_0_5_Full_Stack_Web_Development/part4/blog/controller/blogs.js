const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

// Updated with 4.19
blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).send({ error: 'Title and URL are required' });
  }

  const blog = new Blog({
    title,
    url,
    author: request.user.name,
    likes: request.body.likes || 0,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();
  await savedBlog.populate('user', { username: 1, name: 1 });
  response.status(201).json(savedBlog);
});


blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.author !== request.user.name) {
      return response.status(403).json({ error: 'only the creator can delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.author !== request.user.name) {
    return response.status(403).json({ error: 'only the creator can delete this blog' });
  }

  const { likes } = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators: true }
    );

    if (updatedBlog) {
      response.json(updatedBlog).status(200)
    } else {
      response.status(404).send({ error: 'Blog not found' })
    }
  } catch {
    response.status(400).send({ error: 'Wrong id provided' })
  }
})


module.exports = blogsRouter
