import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue: (value) => new Date(value),
  serialize: (value) => value.toISOString(),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});

const customScalarResolvers = {
  Date: dateScalar,
};

export { customScalarResolvers };
