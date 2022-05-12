const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');

const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
