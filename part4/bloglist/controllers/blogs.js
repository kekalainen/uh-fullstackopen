const express = require('express');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

router.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const authPayload = jwt.verify(request.authToken, JWT_SECRET);

  const user = await User.findById(authPayload.id);

  if (user === null)
    return response.status(401).json({ error: 'auth token user not found' });

  const blog = new Blog({ title, author, url, likes, user: user._id });

  const savedBlog = await blog.save();
  user.blogs.push(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, overwrite: true }
  );

  if (blog === null) return response.status(404).end();
  response.json(blog);
});

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = router;
