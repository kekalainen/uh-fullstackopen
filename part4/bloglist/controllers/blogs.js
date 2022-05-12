const Blog = require('../models/blog');
const express = require('express');

const router = express.Router();

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
