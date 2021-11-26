/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNFTart = /* GraphQL */ `
  mutation CreateNFTart(
    $input: CreateNFTartInput!
    $condition: ModelNFTartConditionInput
  ) {
    createNFTart(input: $input, condition: $condition) {
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
export const updateNFTart = /* GraphQL */ `
  mutation UpdateNFTart(
    $input: UpdateNFTartInput!
    $condition: ModelNFTartConditionInput
  ) {
    updateNFTart(input: $input, condition: $condition) {
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
export const deleteNFTart = /* GraphQL */ `
  mutation DeleteNFTart(
    $input: DeleteNFTartInput!
    $condition: ModelNFTartConditionInput
  ) {
    deleteNFTart(input: $input, condition: $condition) {
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
