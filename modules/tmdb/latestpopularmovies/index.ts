import { GraphQLBoolean, GraphQLFloat, GraphQLInt } from "graphql";

const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const LatestPopularMoviesType = new GraphQLObjectType({
  name: "LatestPopularMoviesType",
  fields: () => ({
    page: { type: GraphQLInt },
    results: { type: new GraphQLList(ResultsType) },
    total_pages: { type: GraphQLInt },
    total_results: { type: GraphQLInt },
  }),
});

export { LatestPopularMoviesType };

const ResultsType = new GraphQLObjectType({
  name: "ResultsType",
  fields: () => ({
    adult: GraphQLBoolean,
    backdrop_path: GraphQLString,
    genre_ids: new GraphQLList(GraphQLInt),
    id: GraphQLInt,
    original_language: GraphQLString,
    original_title: GraphQLString,
    overview: GraphQLString,
    popularity: GraphQLFloat,
    poster_path: GraphQLString,
    release_date: GraphQLString,
    title: GraphQLString,
    video: GraphQLBoolean,
    vote_average: GraphQLFloat,
    vote_count: GraphQLInt,
  }),
});
