"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendingTVShowsType = void 0;
const graphql_1 = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const TrendingTVShowsType = new GraphQLObjectType({
    name: "TrendingTVShowsType",
    fields: () => ({
        page: { type: graphql_1.GraphQLInt },
        results: { type: new GraphQLList(TVResultsType) },
        total_pages: { type: graphql_1.GraphQLInt },
        total_results: { type: graphql_1.GraphQLInt },
    }),
});
exports.TrendingTVShowsType = TrendingTVShowsType;
const TVResultsType = new GraphQLObjectType({
    name: "TVResultsType",
    fields: () => ({
        adult: { type: graphql_1.GraphQLBoolean },
        backdrop_path: { type: GraphQLString },
        genre_ids: { type: new GraphQLList(graphql_1.GraphQLInt) },
        id: { type: graphql_1.GraphQLInt },
        origin_country: { type: new GraphQLList(GraphQLString) },
        original_language: { type: GraphQLString },
        original_name: { type: GraphQLString },
        overview: { type: GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        poster_path: { type: GraphQLString },
        first_air_date: { type: GraphQLString },
        name: { type: GraphQLString },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLFloat },
    }),
});
