import { gql } from '@apollo/client';

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      author {
        bookCount
        born
        id
        name
      }
      genres
      id
      published
      title
    }
  }
`;
