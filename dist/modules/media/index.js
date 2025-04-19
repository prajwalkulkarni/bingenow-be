"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaInputType = exports.MediaType = void 0;
const { GraphQLObjectType, GraphQLInputObjectType, GraphQLString, } = require("graphql");
const MediaType = new GraphQLObjectType({
    name: "MediaType",
    fields: () => ({
        imdbId: { type: GraphQLString },
        title: { type: GraphQLString },
        poster: { type: GraphQLString },
        plot: { type: GraphQLString },
        runtime: { type: GraphQLString },
        year: { type: GraphQLString },
        genre: { type: GraphQLString },
        media: { type: GraphQLString },
    }),
});
exports.MediaType = MediaType;
const MediaInputType = new GraphQLInputObjectType({
    name: "MediaInputType",
    fields: () => ({
        imdbId: { type: GraphQLString },
        title: { type: GraphQLString },
        poster: { type: GraphQLString },
        plot: { type: GraphQLString },
        runtime: { type: GraphQLString },
        year: { type: GraphQLString },
        genre: { type: GraphQLString },
        media: { type: GraphQLString },
    }),
});
exports.MediaInputType = MediaInputType;
