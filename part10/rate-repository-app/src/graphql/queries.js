import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories(first: 10) {
      edges {
        node {
          ...RepositoryFields
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_ONE_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields

      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
`;
