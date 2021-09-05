import { gql } from "apollo-server-express";
import jwt from "jsonwebtoken";

const typeDefs = gql`
  type Mutation {
    login(email: String!, password: String!): String
  }
`;

const resolvers = {
  Mutation: {
    login: (_parent, { email, password }) => {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (email !== adminEmail || password !== adminPassword) {
        return "";
      }

      return jwt.sign(
        {
          email,
          password,
        },
        process.env.SECRET,
        { expiresIn: "1d" },
      );
    },
  },
};

export { typeDefs, resolvers };
