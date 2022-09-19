const { ApolloServer, gql } = require('apollo-server');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

const typeDefs = gql`
  type Author {
    bookCount: Int!
    born: Int
    id: ID!
    name: String!
  }

  type Book {
    author: Author!
    genres: [String!]!
    id: ID!
    published: Int!
    title: String!
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    addBook(
      author: String!
      genres: [String!]!
      published: Int!
      title: String!
    ): Book
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
  }
`;

const resolvers = {
  Mutation: {
    editAuthor: (_root, { name, setBornTo }) => {
      // TODO: Reimplement.
    },
    addBook: async (_root, { author: name, genres, published, title }) => {
      let author = await Author.findOne({ name });

      if (!author) {
        author = new Author({ name });
        await author.save();
      }

      const book = new Book({ author, genres, published, title });
      await book.save();

      return book;
    },
  },
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (_root, { author, genre }) => {
      let filter = {};
      if (author) filter.author = await Author.find({ name: author });
      if (genre) filter.genres = genre;
      return Book.find(filter);
    },
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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
