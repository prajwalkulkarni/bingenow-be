import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const GetMediaDataTypeFields = {
  adult: { type: GraphQLBoolean },
  backdrop_path: { type: GraphQLString },
  created_by: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "CreatedBy",
        fields: {
          id: { type: GraphQLInt },
          credit_id: { type: GraphQLString },
          name: { type: GraphQLString },
          original_name: { type: GraphQLString },
          gender: { type: GraphQLInt },
          profile_path: { type: GraphQLString },
        },
      })
    ),
  },
  episode_run_time: { type: new GraphQLList(GraphQLInt) },
  first_air_date: { type: GraphQLString },
  release_date: { type: GraphQLString },
  genres: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "Genre",
        fields: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
        },
      })
    ),
  },
  homepage: { type: GraphQLString },
  id: { type: GraphQLInt },
  in_production: { type: GraphQLBoolean },
  languages: { type: new GraphQLList(GraphQLString) },
  last_air_date: { type: GraphQLString },
  last_episode_to_air: {
    type: new GraphQLObjectType({
      name: "LastEpisodeToAir",
      fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        overview: { type: GraphQLString },
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt },
        air_date: { type: GraphQLString },
        episode_number: { type: GraphQLInt },
        episode_type: { type: GraphQLString },
        production_code: { type: GraphQLString },
        runtime: { type: GraphQLInt },
        season_number: { type: GraphQLInt },
        show_id: { type: GraphQLInt },
        still_path: { type: GraphQLString },
      },
    }),
  },
  name: { type: GraphQLString },
  title: { type: GraphQLString },
  next_episode_to_air: {
    type: new GraphQLObjectType({
      name: "NextEpisodeToAir",
      fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        overview: { type: GraphQLString },
        vote_average: { type: GraphQLFloat },
        vote_count: { type: GraphQLInt },
        air_date: { type: GraphQLString },
        episode_number: { type: GraphQLInt },
        episode_type: { type: GraphQLString },
        production_code: { type: GraphQLString },
        runtime: { type: GraphQLInt },
        season_number: { type: GraphQLInt },
        show_id: { type: GraphQLInt },
        still_path: { type: GraphQLString },
      },
    }),
  },
  networks: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "Network",
        fields: {
          id: { type: GraphQLInt },
          logo_path: { type: GraphQLString },
          name: { type: GraphQLString },
          origin_country: { type: GraphQLString },
        },
      })
    ),
  },
  number_of_episodes: { type: GraphQLInt },
  number_of_seasons: { type: GraphQLInt },
  origin_country: { type: new GraphQLList(GraphQLString) },
  original_language: { type: GraphQLString },
  original_name: { type: GraphQLString },
  overview: { type: GraphQLString },
  popularity: { type: GraphQLFloat },
  poster_path: { type: GraphQLString },
  production_companies: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "ProductionCompany",
        fields: {
          id: { type: GraphQLInt },
          logo_path: { type: GraphQLString },
          name: { type: GraphQLString },
          origin_country: { type: GraphQLString },
        },
      })
    ),
  },
  production_countries: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "ProductionCountry",
        fields: {
          iso_3166_1: { type: GraphQLString },
          name: { type: GraphQLString },
        },
      })
    ),
  },
  seasons: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "Season",
        fields: {
          air_date: { type: GraphQLString },
          episode_count: { type: GraphQLInt },
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
          overview: { type: GraphQLString },
          poster_path: { type: GraphQLString },
          season_number: { type: GraphQLInt },
          vote_average: { type: GraphQLFloat },
        },
      })
    ),
  },
  spoken_languages: {
    type: new GraphQLList(
      new GraphQLObjectType({
        name: "SpokenLanguage",
        fields: {
          english_name: { type: GraphQLString },
          iso_639_1: { type: GraphQLString },
          name: { type: GraphQLString },
        },
      })
    ),
  },
  status: { type: GraphQLString },
  tagline: { type: GraphQLString },
  type: { type: GraphQLString },
  vote_average: { type: GraphQLFloat },
  vote_count: { type: GraphQLInt },
};
const GetMediaDataType = new GraphQLObjectType({
  name: "GetMediaDataType",
  fields: () => ({
    ...GetMediaDataTypeFields,
  }),
});

export { GetMediaDataType };
