import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook(
    $author: String!
    $genres: [String!]!
    $published: Int!
    $title: String!
  ) {
    addBook(
      author: $author
      genres: $genres
      published: $published
      title: $title
    ) {
      id
    }
  }
`;
