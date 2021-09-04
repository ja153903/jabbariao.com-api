import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type Post {
    id: ID!
    title: String!
    content: String!
    created: Date!
    updated: Date!
  }

  type Query {
    allPosts: [Post!]
    latestPosts: [Post!]
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
};

export { typeDefs, resolvers };
