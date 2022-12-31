import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CREATE_POST($input: PostInput) {
    createPost(input: $input) {
      category
      header_image
      post_title
      post_content
      publish_date
      section
      slug
      description
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UPDATE_POST($input: PostInput) {
    updatePost(input: $input) {
      category
      header_image
      post_title
      post_content
      publish_date
      section
      slug
      description
    }
  }
`;
