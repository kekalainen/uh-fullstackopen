const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
      const author = authors.find((a) => a.name === name);
      if (!author) return null;

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((a) => (a.id === author.id ? updatedAuthor : a));

      return updatedAuthor;
    },
    addBook: (_root, args) => {
      const book = { ...args, id: uuidv4() };
      books.push(book);

      if (!authors.some((a) => a.name === book.author))
        authors.push({ id: uuidv4(), name: book.author });

      return book;
    },
  },
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
    bookCount: () => books.length,
    allBooks: (_root, { author, genre }) => {
      let data = books;
      if (author) data = data.filter((b) => b.author === author);
      if (genre) data = data.filter((b) => b.genres.includes(genre));
      return data;
    },
  },
  Author: {
    bookCount: ({ name }) => books.filter((b) => b.author === name).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
