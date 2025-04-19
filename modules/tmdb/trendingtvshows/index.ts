import { GraphQLBoolean, GraphQLFloat, GraphQLInt } from "graphql";

const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const TrendingTVShowsType = new GraphQLObjectType({
  name: "TrendingTVShowsType",
  fields: () => ({
    page: { type: GraphQLInt },
    results: { type: new GraphQLList(TVResultsType) },
    total_pages: { type: GraphQLInt },
    total_results: { type: GraphQLInt },
  }),
});

export { TrendingTVShowsType };

const TVResultsType = new GraphQLObjectType({
  name: "TVResultsType",
  fields: () => ({
    adult: { type: GraphQLBoolean },
    backdrop_path: { type: GraphQLString },
    genre_ids: { type: new GraphQLList(GraphQLInt) },
    id: { type: GraphQLInt },
    origin_country: { type: new GraphQLList(GraphQLString) },
    original_language: { type: GraphQLString },
    original_name: { type: GraphQLString },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    poster_path: { type: GraphQLString },
    first_air_date: { type: GraphQLString },
    name: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLFloat },
  }),
});
