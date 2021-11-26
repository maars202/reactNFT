/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNFTart = /* GraphQL */ `
  query GetNFTart($id: ID!) {
    getNFTart(id: $id) {
      id
      name
      tag
      description
      image
      creator
      owner
      likes
      createdAt
      updatedAt
    }
  }
`;
export const listNFTarts = /* GraphQL */ `
  query ListNFTarts(
    $filter: ModelNFTartFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTarts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tag
        description
        image
        creator
        owner
        likes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
