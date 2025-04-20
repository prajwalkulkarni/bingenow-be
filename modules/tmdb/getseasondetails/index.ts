import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  CreatedByType,
  CrewMemberType,
  EpisodeType,
  GenreType,
  GuestStarType,
  LastEdpisodeToAirType,
  NetoworkType,
  NextEpisodeToAirType,
  ProductionCompanyType,
  ProductionCountryType,
  SeasonType,
  SpokenLanguageType,
} from "../../common";

const fields = {
  adult: { type: GraphQLBoolean },
  backdrop_path: { type: GraphQLString },
  episodes: {
    type: new GraphQLList(EpisodeType),
  },
  created_by: {
    type: new GraphQLList(CreatedByType),
  },
  episode_run_time: { type: new GraphQLList(GraphQLInt) },
  first_air_date: { type: GraphQLString },
  genres: {
    type: new GraphQLList(GenreType),
  },
  homepage: { type: GraphQLString },
  id: { type: GraphQLInt },
  in_production: { type: GraphQLBoolean },
  languages: { type: new GraphQLList(GraphQLString) },
  last_air_date: { type: GraphQLString },
  last_episode_to_air: {
    type: LastEdpisodeToAirType,
  },
  name: { type: GraphQLString },
  next_episode_to_air: {
    type: NextEpisodeToAirType,
  },
  networks: {
    type: new GraphQLList(NetoworkType),
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
    type: new GraphQLList(ProductionCompanyType),
  },
  production_countries: {
    type: new GraphQLList(ProductionCountryType),
  },
  seasons: {
    type: new GraphQLList(SeasonType),
  },
  spoken_languages: {
    type: new GraphQLList(SpokenLanguageType),
  },
  status: { type: GraphQLString },
  tagline: { type: GraphQLString },
  type: { type: GraphQLString },
  vote_average: { type: GraphQLFloat },
  vote_count: { type: GraphQLInt },
};
const GetSeasonDetailsType = new GraphQLObjectType({
  name: "GetSeasonDetailsType",
  fields: () => ({
    ...fields,
  }),
});

export { GetSeasonDetailsType };
