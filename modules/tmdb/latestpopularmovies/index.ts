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
    adult: { type: GraphQLBoolean },
    backdrop_path: { type: GraphQLString },
    genre_ids: { type: new GraphQLList(GraphQLInt) },
    id: { type: GraphQLInt },
    original_language: { type: GraphQLString },
    original_title: { type: GraphQLString },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    poster_path: { type: GraphQLString },
    release_date: { type: GraphQLString },
    title: { type: GraphQLString },
    video: { type: GraphQLBoolean },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLInt },
  }),
});
