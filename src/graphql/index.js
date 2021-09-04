import { ApolloServer } from "apollo-server-express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import {
  typeDefs as postTypeDefs,
  resolvers as postResolvers,
} from "../posts/graphql";

const typeDefs = mergeTypeDefs([postTypeDefs]);
const resolvers = mergeResolvers([postResolvers]);

export default new ApolloServer({
  typeDefs,
  resolvers,
});
