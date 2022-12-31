import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  type Post {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  input PostInput {
    section: String
    category: String
    publish_date: Date
    slug: String
    header_image: String
    post_title: String
    post_content: String
    description: String
  }

  type Query {
    getPost(slug: String): Post
    getPosts: [Post]
  }

  type Mutation {
    #Products
    createPost(input: PostInput): Post
    updatePost(input: PostInput): Post
  }
`;

module.exports = typeDefs;
