import { ApolloServer } from "apollo-server-express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

import { customScalarResolvers } from "./scalarTypes";

import { typeDefs as postTypeDefs, resolvers as postResolvers } from "../posts";
import { cors } from "../config";

const typeDefs = mergeTypeDefs([postTypeDefs]);
const resolvers = mergeResolvers([postResolvers, customScalarResolvers]);

async function startApolloServer(app, httpServer, port) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `GraphQL server available at localhost:${port}${apolloServer.graphqlPath}`,
  );
}

export { startApolloServer };
