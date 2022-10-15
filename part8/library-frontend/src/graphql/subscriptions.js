import { gql } from '@apollo/client';

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      author {
        id
        name
      }
      id
      title
    }
  }
`;
