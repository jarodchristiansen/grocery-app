import User from "./models/user";
import Post from "./models/post";

// const CoinGecko = require("coingecko-api");

const Product = require("./models/product");
const Asset = require("./models/asset");
import { dateScalar } from "./scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    getPosts: async (_, {}) => {
      try {
        let posts = await Post.find({});

        return posts;
      } catch (err) {
        console.log("ERROR IN TRY CATCH GET POSTS");
      }
    },
    getPost: async (_, { slug }) => {
      try {
        let post = await Post.findOne({ slug });

        return post;
      } catch (err) {
        console.log("ERROR IN TRY CATCH GET POSTS");
      }
    },
  },

  Mutation: {
    createPost: async (_, { input }) => {
      const {
        section,
        category,
        publish_date,
        slug,
        post_title,
        post_content,
      } = input;
      try {
        let existingPost = await Post.findOne({ slug });
        if (existingPost) {
          return console.error("Existing Post Slug");
        } else {
          const newPost = new Post(input);
          let posted = await newPost.save();

          console.log("AFTER POST CREATED ", { posted });
          return posted;
        }
      } catch (err) {
        console.log("IN CREATE POST ERR", { err });
      }
    },
    updatePost: async (_, { input }) => {
      const {
        section,
        category,
        publish_date,
        slug,
        post_title,
        post_content,
      } = input;
      try {
        let post = await Post.findOne({ slug });
        if (post) {
          for (let i in input) {
            if (post[i] !== input[i]) {
              post[i] = input[i];
            }
          }
          post.description = input.description;

          await post.save();

          return input;
        }
      } catch (err) {
        console.log("IN CREATE POST ERR", { err });
      }
    },
  },
};

module.exports = resolvers;
