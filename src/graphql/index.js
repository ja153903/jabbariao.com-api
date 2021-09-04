import { ApolloServer } from "apollo-server-express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { customScalarResolvers } from "./scalarTypes";

import { typeDefs as postTypeDefs, resolvers as postResolvers } from "../posts";

const typeDefs = mergeTypeDefs([postTypeDefs]);
const resolvers = mergeResolvers([postResolvers, customScalarResolvers]);

export default new ApolloServer({
  typeDefs,
  resolvers,
});
