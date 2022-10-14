const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { context, resolvers, typeDefs } = require('./graphql');
const { MONGODB_URI, PORT } = require('./utils/config');

mongoose.connect(MONGODB_URI);

const app = express();

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await apolloServer.start();

  app.use(apolloServer.getMiddleware({ path: '/' }));

  await httpServer.listen({ port: PORT });

  console.log(
    `Server ready at http://localhost:${PORT + apolloServer.graphqlPath}`
  );
})();
