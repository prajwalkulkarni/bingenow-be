"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatestPopularMoviesType = void 0;
const graphql_1 = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const LatestPopularMoviesType = new GraphQLObjectType({
    name: "LatestPopularMoviesType",
    fields: () => ({
        page: { type: graphql_1.GraphQLInt },
        results: { type: new GraphQLList(ResultsType) },
        total_pages: { type: graphql_1.GraphQLInt },
        total_results: { type: graphql_1.GraphQLInt },
    }),
});
exports.LatestPopularMoviesType = LatestPopularMoviesType;
const ResultsType = new GraphQLObjectType({
    name: "ResultsType",
    fields: () => ({
        adult: { type: graphql_1.GraphQLBoolean },
        backdrop_path: { type: GraphQLString },
        genre_ids: { type: new GraphQLList(graphql_1.GraphQLInt) },
        id: { type: graphql_1.GraphQLInt },
        original_language: { type: GraphQLString },
        original_title: { type: GraphQLString },
        overview: { type: GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        poster_path: { type: GraphQLString },
        release_date: { type: GraphQLString },
        title: { type: GraphQLString },
        video: { type: graphql_1.GraphQLBoolean },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
    }),
});
