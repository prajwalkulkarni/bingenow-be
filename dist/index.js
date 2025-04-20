"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_1 = require("./modules/media");
const user_1 = require("./modules/user");
const latestpopularmovies_1 = require("./modules/tmdb/latestpopularmovies");
const trendingtvshows_1 = require("./modules/tmdb/trendingtvshows");
const find_1 = require("./modules/tmdb/find");
const getseasondetails_1 = require("./modules/tmdb/getseasondetails");
const getmediadata_1 = require("./modules/getmediadata");
const fetch = require("node-fetch");
const app = (0, express_1.default)();
const connectToDatabase = require("./mongo-client");
const awsServerlessExpress = require("aws-serverless-express");
const PORT_NO = 3001;
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const expressGraphQL = require("express-graphql").graphqlHTTP;
const User = require("./models/user");
const cors = require("cors");
const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString, } = require("graphql");
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        watchlist: {
            type: new GraphQLList(media_1.MediaType),
            args: {
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const res = await User.findOne({ _id: args.id });
                return res.watchlist;
            },
        },
        latestpopularmovies: {
            type: latestpopularmovies_1.LatestPopularMoviesType,
            args: {},
            resolve: async (parent, args) => {
                try {
                    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=7e781002994df832bb2bcb06c4951e32&language=en-US&page=1", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Forwarded-For": "api.themoviedb.org",
                        },
                    });
                    const asJSON = await response.json();
                    return asJSON;
                }
                catch (err) {
                    console.error("Something went wrong");
                }
            },
        },
        trendingtvshows: {
            type: trendingtvshows_1.TrendingTVShowsType,
            args: {},
            resolve: async (parent, args) => {
                try {
                    const response = await fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=7e781002994df832bb2bcb06c4951e32&language=en-US&page=1", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Forwarded-For": "api.themoviedb.org",
                        },
                    });
                    const asJSON = await response.json();
                    return asJSON;
                }
                catch (err) {
                    console.error("Something went wrong");
                }
            },
        },
        findMovieOrTV: {
            type: find_1.FindMovieTVType,
            args: {
                imdbId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/find/${args.imdbId}?api_key=7e781002994df832bb2bcb06c4951e32&external_source=imdb_id`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Forwarded-For": "api.themoviedb.org",
                        },
                    });
                    const asJSON = await response.json();
                    return asJSON;
                }
                catch (err) {
                    console.error("Something went wrong");
                }
            },
        },
        getseasondetails: {
            type: getseasondetails_1.GetSeasonDetailsType,
            args: {
                tmdbId: { type: GraphQLString },
                season: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/tv/${args.tmdbId}?api_key=7e781002994df832bb2bcb06c4951e32&append_to_response=season/${args.season}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Forwarded-For": "api.themoviedb.org",
                        },
                    });
                    const asJSON = await response.json();
                    const episodesDetails = [
                        ...asJSON[`season/${args.season}`]["episodes"],
                    ];
                    delete asJSON[`season/${args.season}`];
                    asJSON.episodes = episodesDetails;
                    return asJSON;
                }
                catch (err) {
                    console.error("Something went wrong");
                }
            },
        },
        getmediadata: {
            type: getmediadata_1.GetMediaDataType,
            args: {
                media_type: { type: GraphQLString },
                imdbId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/${args.media_type}/${args.imdbId}?api_key=7e781002994df832bb2bcb06c4951e32`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "X-Forwarded-For": "api.themoviedb.org",
                        },
                    });
                    const asJSON = await response.json();
                    return asJSON;
                }
                catch (err) {
                    console.error("Something went wrong");
                }
            },
        },
    }),
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
        createOrGetUser: {
            type: user_1.UserType,
            args: {
                email: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const user = await User.findOne({ email: args.email });
                if (user) {
                    return {
                        id: user._id,
                        email: user.email,
                    };
                }
                const newUser = {
                    email: args.email,
                    watchlist: [],
                };
                const registerUser = new User(newUser);
                const user_id = await registerUser.save();
                return {
                    id: user_id._id,
                    email: args.email,
                };
            },
        },
        addToWatchlist: {
            type: media_1.MediaType,
            args: {
                item: {
                    type: media_1.MediaInputType,
                },
                userId: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const user = await User.findOne({ _id: args.userId });
                if (user) {
                    try {
                        const item = user.watchlist.find((item) => item.imdbId === args.item.imdbId);
                        if (user.watchlist.length >= 10) {
                            throw new Error("Watchlist can have upto 10 items. Please remove an item to add a new one.");
                        }
                        if (!item) {
                            await User.findByIdAndUpdate({ _id: args.userId }, { $push: { watchlist: args.item } });
                        }
                        else {
                            throw new Error("Media already exists in the watchlist");
                        }
                        return args.item;
                    }
                    catch (err) {
                        console.log(err);
                        throw new Error("Item already exists in the watchlist");
                    }
                }
            },
        },
        removeFromWatchlist: {
            type: media_1.MediaType,
            args: {
                imdbId: { type: GraphQLString },
                id: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const user = await User.findOne({ _id: args.id });
                if (user) {
                    try {
                        const item = user.watchlist.find((item) => item.imdbId === args.imdbId);
                        if (item) {
                            await User.findByIdAndUpdate({ _id: args.id }, { $pull: { watchlist: { imdbId: args.imdbId } } });
                        }
                        else {
                            throw new Error("Media does not exist in the watchlist");
                        }
                        return item;
                    }
                    catch (err) {
                        console.log(err);
                        throw new Error("Media does not exist in the watchlist");
                    }
                }
            },
        },
    }),
});
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    res.set("Content-Type", "application/json");
    next();
});
app.options("/graphql", cors());
app.use("/graphql", expressGraphQL({
    graphiql: true,
    schema,
    mutation: Mutation,
}));
exports.handler = async (event, context) => {
    await connectToDatabase();
    console.log("Connection successful");
    const server = awsServerlessExpress.createServer(app);
    const response = await new Promise((resolve, reject) => {
        const { httpMethod, path, headers, body } = event;
        const queryStringParameters = event.queryStringParameters || {};
        const eventProxy = {
            httpMethod,
            path: "/graphql",
            headers,
            queryStringParameters,
            body: body,
        };
        awsServerlessExpress.proxy(server, eventProxy, Object.assign(Object.assign({}, context), { succeed: resolve, fail: reject }));
    });
    return response;
};
