const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const router = express.Router();

router.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect))
    return response.status(401).json({
      error: 'invalid username or password',
    });

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    JWT_SECRET,
    { expiresIn: 60 * 60 }
  );

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;
