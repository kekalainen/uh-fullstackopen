const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { context, resolvers, typeDefs } = require('./graphql');
const { MONGODB_URI } = require('./utils/config');

mongoose.connect(MONGODB_URI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
