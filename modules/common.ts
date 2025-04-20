import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const CreatedByType = new GraphQLObjectType({
  name: "CreatedBy",
  fields: {
    id: { type: GraphQLInt },
    credit_id: { type: GraphQLString },
    name: { type: GraphQLString },
    original_name: { type: GraphQLString },
    gender: { type: GraphQLInt },
    profile_path: { type: GraphQLString },
  },
});

export const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

export const LastEdpisodeToAirType = new GraphQLObjectType({
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
});

export const NextEpisodeToAirType = new GraphQLObjectType({
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
});

export const NetoworkType = new GraphQLObjectType({
  name: "Network",
  fields: {
    id: { type: GraphQLInt },
    logo_path: { type: GraphQLString },
    name: { type: GraphQLString },
    origin_country: { type: GraphQLString },
  },
});

export const ProductionCompanyType = new GraphQLObjectType({
  name: "ProductionCompany",
  fields: {
    id: { type: GraphQLInt },
    logo_path: { type: GraphQLString },
    name: { type: GraphQLString },
    origin_country: { type: GraphQLString },
  },
});

export const ProductionCountryType = new GraphQLObjectType({
  name: "ProductionCountry",
  fields: {
    iso_3166_1: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export const SpokenLanguageType = new GraphQLObjectType({
  name: "SpokenLanguage",
  fields: {
    english_name: { type: GraphQLString },
    iso_639_1: { type: GraphQLString },
    name: { type: GraphQLString },
  },
});

export const SeasonType = new GraphQLObjectType({
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
});

export const GuestStarType = new GraphQLObjectType({
  name: "GuestStar",
  fields: {
    character: { type: GraphQLString },
    credit_id: { type: GraphQLString },
    order: { type: GraphQLInt },
    adult: { type: GraphQLBoolean },
    gender: { type: GraphQLInt },
    id: { type: GraphQLInt },
    known_for_department: { type: GraphQLString },
    name: { type: GraphQLString },
    original_name: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    profile_path: { type: GraphQLString },
  },
});

export const CrewMemberType = new GraphQLObjectType({
  name: "CrewMember",
  fields: {
    job: { type: GraphQLString },
    department: { type: GraphQLString },
    credit_id: { type: GraphQLString },
    adult: { type: GraphQLBoolean },
    gender: { type: GraphQLInt },
    id: { type: GraphQLInt },
    known_for_department: { type: GraphQLString },
    name: { type: GraphQLString },
    original_name: { type: GraphQLString },
    popularity: { type: GraphQLFloat },
    profile_path: { type: GraphQLString },
  },
});

export const EpisodeType = new GraphQLObjectType({
  name: "Episode",
  fields: {
    air_date: { type: GraphQLString },
    episode_number: { type: GraphQLInt },
    episode_type: { type: GraphQLString },
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    overview: { type: GraphQLString },
    production_code: { type: GraphQLString },
    runtime: { type: GraphQLInt },
    season_number: { type: GraphQLInt },
    show_id: { type: GraphQLInt },
    still_path: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    vote_count: { type: GraphQLInt },
    crew: {
      type: new GraphQLList(CrewMemberType),
    },
    guest_stars: {
      type: new GraphQLList(GuestStarType),
    },
  },
});
