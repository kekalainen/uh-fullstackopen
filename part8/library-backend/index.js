const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { resolvers, typeDefs } = require('./graphql');
const { JWT_SECRET, MONGODB_URI } = require('./utils/config');
const User = require('./models/user');

mongoose.connect(MONGODB_URI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req?.headers?.authorization;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const { id } = jwt.verify(auth.substring(7), JWT_SECRET);
      const authUser = await User.findById(id);
      return { authUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
