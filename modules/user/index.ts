import { MediaType } from "../media";

const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    watchlist: { type: new GraphQLList(MediaType) },
  }),
});

export { UserType };
