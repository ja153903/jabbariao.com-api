import Express from "express";

import apolloServer from "./graphql";

const app = Express();
const port = process.env.PORT || 5050;

apolloServer.applyMiddleware({ app });

app.listen(() => {
  console.log(`Listening on port ${port}`);
});
