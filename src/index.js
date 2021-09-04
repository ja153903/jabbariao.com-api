import Express from "express";
import cors from "cors";

import apolloServer from "./graphql";

const app = Express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded());

async function startApolloServer() {
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(
      `GraphQL server available at localhost:${port}${apolloServer.graphqlPath}`,
    );
  });
}

startApolloServer();
