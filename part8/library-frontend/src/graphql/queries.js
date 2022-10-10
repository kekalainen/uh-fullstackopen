import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    allBooks {
      author {
        name
      }
      id
      published
      title
    }
  }
`;
