const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

/*
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */
let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Author {
    bookCount: Int!
    born: Int
    id: ID!
    name: String!
  }

  type Book {
    author: String!
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