import { rule, shield } from "graphql-shield";

const isAuthenticated = rule()((_parent, _args, { isJwtVerified }) => {
  return isJwtVerified;
});

export default shield({
  Mutation: {
    createPost: isAuthenticated,
  },
});
