import Express from "express";
import http from "http";

import { startApolloServer } from "./graphql";

const app = Express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 5050;

startApolloServer(app, httpServer, port);
