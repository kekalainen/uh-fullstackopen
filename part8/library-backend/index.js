const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { typeDefs } = require('./graphql');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const { JWT_SECRET, MONGODB_URI } = require('./utils/config');
const { handleDatabaseError } = require('./utils/errors');

mongoose.connect(MONGODB_URI);

const resolvers = {
  Mutation: {
    editAuthor: async (_root, { name, setBornTo }, { authUser }) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      return Author.findOneAndUpdate(
        { name },
        { born: setBornTo },
        { new: true }
      );
    },
    addBook: async (
      _root,
      { author: name, genres, published, title },
      { authUser }
    ) => {
      if (!authUser) throw new AuthenticationError('unauthenticated');

      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save().catch(handleDatabaseError);
      }

      const book = new Book({ author, genres, published, title });
      await book.save().catch(handleDatabaseError);

      return book;
    },
    createUser: async (_root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre });
      return user.save().catch(handleDatabaseError);
    },
    login: async (_root, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== 'hunter2')
        throw new UserInputError('invalid credentials');

      return { value: jwt.sign({ id: user._id }, JWT_SECRET) };
    },
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.findOne({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
    me: (_root, _args, { authUser }) => authUser,
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent }),
  },
  Book: {
    author: async (parent) => {
      await parent.populate('author');
      return parent.author;
    },
  },
};

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
