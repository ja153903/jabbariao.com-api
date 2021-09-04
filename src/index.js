import Express from "express";

import apolloServer from "./graphql";

const app = Express();

apolloServer.applyMiddleware({ app });

app.listen(() => {
  console.log("Listening on some port");
});
