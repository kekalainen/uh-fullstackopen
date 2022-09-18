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
