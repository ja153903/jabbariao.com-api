import { ApolloServer } from "apollo-server-express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import jwt from "jsonwebtoken";

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
    context: ({ req }) => {
      const token = req.headers.authorization || "";
      const secret = process.env.SECRET || "";

      let isJwtVerified = false;

      try {
        jwt.verify(token, secret);
        isJwtVerified = true;
      } catch (err) {
        console.log(`Something went wrong: ${err}`);
      }

      return { isJwtVerified };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  console.log(
    `GraphQL server available at localhost:${port}${apolloServer.graphqlPath}`,
  );
}

export { startApolloServer };
