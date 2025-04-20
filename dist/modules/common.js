"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeType = exports.CrewMemberType = exports.GuestStarType = exports.SeasonType = exports.SpokenLanguageType = exports.ProductionCountryType = exports.ProductionCompanyType = exports.NetoworkType = exports.NextEpisodeToAirType = exports.LastEdpisodeToAirType = exports.GenreType = exports.CreatedByType = void 0;
const graphql_1 = require("graphql");
exports.CreatedByType = new graphql_1.GraphQLObjectType({
    name: "CreatedBy",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        credit_id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        original_name: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLInt },
        profile_path: { type: graphql_1.GraphQLString },
    },
});
exports.GenreType = new graphql_1.GraphQLObjectType({
    name: "Genre",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
    },
});
exports.LastEdpisodeToAirType = new graphql_1.GraphQLObjectType({
    name: "LastEpisodeToAir",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
        air_date: { type: graphql_1.GraphQLString },
        episode_number: { type: graphql_1.GraphQLInt },
        episode_type: { type: graphql_1.GraphQLString },
        production_code: { type: graphql_1.GraphQLString },
        runtime: { type: graphql_1.GraphQLInt },
        season_number: { type: graphql_1.GraphQLInt },
        show_id: { type: graphql_1.GraphQLInt },
        still_path: { type: graphql_1.GraphQLString },
    },
});
exports.NextEpisodeToAirType = new graphql_1.GraphQLObjectType({
    name: "NextEpisodeToAir",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
        air_date: { type: graphql_1.GraphQLString },
        episode_number: { type: graphql_1.GraphQLInt },
        episode_type: { type: graphql_1.GraphQLString },
        production_code: { type: graphql_1.GraphQLString },
        runtime: { type: graphql_1.GraphQLInt },
        season_number: { type: graphql_1.GraphQLInt },
        show_id: { type: graphql_1.GraphQLInt },
        still_path: { type: graphql_1.GraphQLString },
    },
});
exports.NetoworkType = new graphql_1.GraphQLObjectType({
    name: "Network",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        logo_path: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        origin_country: { type: graphql_1.GraphQLString },
    },
});
exports.ProductionCompanyType = new graphql_1.GraphQLObjectType({
    name: "ProductionCompany",
    fields: {
        id: { type: graphql_1.GraphQLInt },
        logo_path: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        origin_country: { type: graphql_1.GraphQLString },
    },
});
exports.ProductionCountryType = new graphql_1.GraphQLObjectType({
    name: "ProductionCountry",
    fields: {
        iso_3166_1: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
});
exports.SpokenLanguageType = new graphql_1.GraphQLObjectType({
    name: "SpokenLanguage",
    fields: {
        english_name: { type: graphql_1.GraphQLString },
        iso_639_1: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
});
exports.SeasonType = new graphql_1.GraphQLObjectType({
    name: "Season",
    fields: {
        air_date: { type: graphql_1.GraphQLString },
        episode_count: { type: graphql_1.GraphQLInt },
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString },
        poster_path: { type: graphql_1.GraphQLString },
        season_number: { type: graphql_1.GraphQLInt },
        vote_average: { type: graphql_1.GraphQLFloat },
    },
});
exports.GuestStarType = new graphql_1.GraphQLObjectType({
    name: "GuestStar",
    fields: {
        character: { type: graphql_1.GraphQLString },
        credit_id: { type: graphql_1.GraphQLString },
        order: { type: graphql_1.GraphQLInt },
        adult: { type: graphql_1.GraphQLBoolean },
        gender: { type: graphql_1.GraphQLInt },
        id: { type: graphql_1.GraphQLInt },
        known_for_department: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        original_name: { type: graphql_1.GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        profile_path: { type: graphql_1.GraphQLString },
    },
});
exports.CrewMemberType = new graphql_1.GraphQLObjectType({
    name: "CrewMember",
    fields: {
        job: { type: graphql_1.GraphQLString },
        department: { type: graphql_1.GraphQLString },
        credit_id: { type: graphql_1.GraphQLString },
        adult: { type: graphql_1.GraphQLBoolean },
        gender: { type: graphql_1.GraphQLInt },
        id: { type: graphql_1.GraphQLInt },
        known_for_department: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        original_name: { type: graphql_1.GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        profile_path: { type: graphql_1.GraphQLString },
    },
});
exports.EpisodeType = new graphql_1.GraphQLObjectType({
    name: "Episode",
    fields: {
        air_date: { type: graphql_1.GraphQLString },
        episode_number: { type: graphql_1.GraphQLInt },
        episode_type: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString },
        production_code: { type: graphql_1.GraphQLString },
        runtime: { type: graphql_1.GraphQLInt },
        season_number: { type: graphql_1.GraphQLInt },
        show_id: { type: graphql_1.GraphQLInt },
        still_path: { type: graphql_1.GraphQLString },
        vote_average: { type: graphql_1.GraphQLFloat },
        vote_count: { type: graphql_1.GraphQLInt },
        crew: {
            type: new graphql_1.GraphQLList(exports.CrewMemberType),
        },
        guest_stars: {
            type: new graphql_1.GraphQLList(exports.GuestStarType),
        },
    },
});
