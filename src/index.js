import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { startApolloServer } from "./graphql";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

startApolloServer(app, httpServer, port);
