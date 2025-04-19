"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = void 0;
const media_1 = require("../media");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: GraphQLString },
        email: { type: GraphQLString },
        watchlist: { type: new GraphQLList(media_1.MediaType) },
    }),
});
exports.UserType = UserType;
