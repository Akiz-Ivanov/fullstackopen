import { gql } from "@apollo/client";
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username

      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields

            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }

  ${REVIEW_FIELDS}
`;

export const GET_ONE_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFields

      reviews(first: $first, after: $after) {
        edges {
          node {
            ...ReviewFields
          }
          cursor
        }

        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
`;
