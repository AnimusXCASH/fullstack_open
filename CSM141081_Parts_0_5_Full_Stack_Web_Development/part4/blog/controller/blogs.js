const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('/blogs', async (request, response) => {

  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).send({ error: 'Title and URL are required' })
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


blogsRouter.delete('/blogs/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    response.status(400).send({ error: 'Id issue' });
  }
});

blogsRouter.put('/blogs/:id', async (request, response, next) => {
  const { likes } = request.body
  try {
    const updatedBlog  = await Blog.findByIdAndUpdate(
      request.params.id,
      { likes },
      { new: true, runValidators:true }
    );

    if (updatedBlog ) {
      response.json(updatedBlog )
    } else {
      response.status(404).send({ error: 'Blog not found' })
    }
  } catch {
    response.status(400).send({ error: 'Wrong id provided' })
  }
})


module.exports = blogsRouter