"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMovieTVType = void 0;
const graphql_1 = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const FindMovieTVType = new GraphQLObjectType({
    name: "FindMovieTVType",
    fields: () => ({
        movie_results: { type: new GraphQLList(MovieResultsType) },
        tv_results: { type: new GraphQLList(FindTVResultsType) },
    }),
});
exports.FindMovieTVType = FindMovieTVType;
const MovieResultsType = new GraphQLObjectType({
    name: "MovieResultsType",
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
        media_type: { type: GraphQLString },
        release_date: { type: GraphQLString },
        title: { type: GraphQLString },
        video: { type: graphql_1.GraphQLBoolean },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
    }),
});
const FindTVResultsType = new GraphQLObjectType({
    name: "FindTVResultsType",
    fields: () => ({
        adult: { type: graphql_1.GraphQLBoolean },
        backdrop_path: { type: GraphQLString },
        genre_ids: { type: new GraphQLList(graphql_1.GraphQLInt) },
        id: { type: graphql_1.GraphQLInt },
        original_language: { type: GraphQLString },
        original_name: { type: GraphQLString },
        origin_country: { type: new GraphQLList(GraphQLString) },
        overview: { type: GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        poster_path: { type: GraphQLString },
        media_type: { type: GraphQLString },
        first_air_date: { type: GraphQLString },
        name: { type: GraphQLString },
        video: { type: graphql_1.GraphQLBoolean },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
    }),
});
