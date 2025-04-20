"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMediaDataType = void 0;
const graphql_1 = require("graphql");
const common_1 = require("../common");
const GetMediaDataTypeFields = {
    adult: { type: graphql_1.GraphQLBoolean },
    backdrop_path: { type: graphql_1.GraphQLString },
    created_by: {
        type: new graphql_1.GraphQLList(common_1.CreatedByType),
    },
    episode_run_time: { type: new graphql_1.GraphQLList(graphql_1.GraphQLInt) },
    first_air_date: { type: graphql_1.GraphQLString },
    release_date: { type: graphql_1.GraphQLString },
    genres: {
        type: new graphql_1.GraphQLList(common_1.GenreType),
    },
    homepage: { type: graphql_1.GraphQLString },
    id: { type: graphql_1.GraphQLInt },
    in_production: { type: graphql_1.GraphQLBoolean },
    languages: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    last_air_date: { type: graphql_1.GraphQLString },
    last_episode_to_air: {
        type: common_1.LastEdpisodeToAirType,
    },
    name: { type: graphql_1.GraphQLString },
    title: { type: graphql_1.GraphQLString },
    next_episode_to_air: {
        type: common_1.NextEpisodeToAirType,
    },
    networks: {
        type: new graphql_1.GraphQLList(common_1.NetoworkType),
    },
    number_of_episodes: { type: graphql_1.GraphQLInt },
    number_of_seasons: { type: graphql_1.GraphQLInt },
    origin_country: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    original_language: { type: graphql_1.GraphQLString },
    original_name: { type: graphql_1.GraphQLString },
    overview: { type: graphql_1.GraphQLString },
    popularity: { type: graphql_1.GraphQLFloat },
    poster_path: { type: graphql_1.GraphQLString },
    production_companies: {
        type: new graphql_1.GraphQLList(common_1.ProductionCompanyType),
    },
    production_countries: {
        type: new graphql_1.GraphQLList(common_1.ProductionCountryType),
    },
    seasons: {
        type: new graphql_1.GraphQLList(common_1.SeasonType),
    },
    spoken_languages: {
        type: new graphql_1.GraphQLList(common_1.SpokenLanguageType),
    },
    status: { type: graphql_1.GraphQLString },
    tagline: { type: graphql_1.GraphQLString },
    type: { type: graphql_1.GraphQLString },
    vote_average: { type: graphql_1.GraphQLFloat },
    vote_count: { type: graphql_1.GraphQLInt },
};
const GetMediaDataType = new graphql_1.GraphQLObjectType({
    name: "GetMediaDataType",
    fields: () => (Object.assign({}, GetMediaDataTypeFields)),
});
exports.GetMediaDataType = GetMediaDataType;
