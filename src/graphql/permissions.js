import { rule, shield } from "graphql-shield";

// TODO: Figure out the proper way to authorize here
const isAuthenticated = rule()((_parent, _args, { user }) => {
  return user !== null;
});

export default shield({
  Mutation: {
    createPost: isAuthenticated,
  },
});
