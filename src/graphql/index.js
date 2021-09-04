import { ApolloServer } from "apollo-server-express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

import { customScalarResolvers } from "./scalarTypes";
import permissions from "./permissions";

import { typeDefs as postTypeDefs, resolvers as postResolvers } from "../posts";

const typeDefs = mergeTypeDefs([postTypeDefs]);
const resolvers = mergeResolvers([postResolvers, customScalarResolvers]);

async function startApolloServer(app, httpServer, port) {
  const apolloServer = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers }),
      permissions,
    ),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `GraphQL server available at localhost:${port}${apolloServer.graphqlPath}`,
  );
}

export { startApolloServer };
