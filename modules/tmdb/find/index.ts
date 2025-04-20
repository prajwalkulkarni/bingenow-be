import { GraphQLBoolean, GraphQLFloat, GraphQLInt } from "graphql";

const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");

const FindMovieTVType = new GraphQLObjectType({
  name: "FindMovieTVType",
  fields: () => ({
    movie_results: { type: new GraphQLList(MovieResultsType) },
    tv_results: { type: new GraphQLList(FindTVResultsType) },
  }),
});

export { FindMovieTVType };

const MovieResultsType = new GraphQLObjectType({
  name: "MovieResultsType",
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
    media_type: { type: GraphQLString },
    release_date: { type: GraphQLString },
    title: { type: GraphQLString },
    video: { type: GraphQLBoolean },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLInt },
  }),
});

const FindTVResultsType = new GraphQLObjectType({
  name: "FindTVResultsType",
  fields: () => ({
    adult: { type: GraphQLBoolean },
    backdrop_path: { type: GraphQLString },
    genre_ids: { type: new GraphQLList(GraphQLInt) },
    id: { type: GraphQLInt },
    original_language: { type: GraphQLString },
    original_name: { type: GraphQLString },
    origin_country: { type: new GraphQLList(GraphQLString) },
    overview: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    poster_path: { type: GraphQLString },
    media_type: { type: GraphQLString },
    first_air_date: { type: GraphQLString },
    name: { type: GraphQLString },
    video: { type: GraphQLBoolean },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLInt },
  }),
});
