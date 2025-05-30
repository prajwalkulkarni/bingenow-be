import express from "express";
import { Request, Response } from "express";
import { Context, APIGatewayEvent } from "aws-lambda";
import { MediaInputType, MediaType } from "./modules/media";
import { UserType } from "./modules/user";
import { LatestPopularMoviesType } from "./modules/tmdb/latestpopularmovies";
import { TrendingTVShowsType } from "./modules/tmdb/trendingtvshows";
import { FindMovieTVType } from "./modules/tmdb/find";
import { GetSeasonDetailsType } from "./modules/tmdb/getseasondetails";
import { GetMediaDataType } from "./modules/getmediadata";
const fetch = require("node-fetch");
const app = express();
const connectToDatabase = require("./mongo-client");
const awsServerlessExpress = require("aws-serverless-express");

const PORT_NO = 3001;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const expressGraphQL = require("express-graphql").graphqlHTTP;
const User = require("./models/user");
const cors = require("cors");

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
} = require("graphql");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    watchlist: {
      type: new GraphQLList(MediaType),
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (parent: any, args: any) => {
        const res = await User.findOne({ _id: args.id });
        return res.watchlist;
      },
    },
    latestpopularmovies: {
      type: LatestPopularMoviesType,
      args: {},
      resolve: async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=7e781002994df832bb2bcb06c4951e32&language=en-US&page=1",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": "api.themoviedb.org",
              },
            }
          );

          const asJSON = await response.json();
          return asJSON;
        } catch (err) {
          console.error("Something went wrong");
        }
      },
    },
    trendingtvshows: {
      type: TrendingTVShowsType,
      args: {},
      resolve: async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/tv/top_rated?api_key=7e781002994df832bb2bcb06c4951e32&language=en-US&page=1",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": "api.themoviedb.org",
              },
            }
          );

          const asJSON = await response.json();
          return asJSON;
        } catch (err) {
          console.error("Something went wrong");
        }
      },
    },
    findMovieOrTV: {
      type: FindMovieTVType,
      args: {
        imdbId: { type: GraphQLString },
      },
      resolve: async (_: unknown, args: { imdbId: string }) => {
        try {
          const imdbId = String(args.imdbId); // Ensure imdbId is a string
          const response = await fetch(
            `https://api.themoviedb.org/3/find/${imdbId}?api_key=7e781002994df832bb2bcb06c4951e32&external_source=imdb_id`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": "api.themoviedb.org",
              },
            }
          );

          const asJSON = await response.json();
          return asJSON;
        } catch (err) {
          console.error("Something went wrong", err);
        }
      },
    },
    getseasondetails: {
      type: GetSeasonDetailsType,
      args: {
        tmdbId: { type: GraphQLString },
        season: { type: GraphQLString },
      },
      resolve: async (_: unknown, args: { tmdbId: string; season: string }) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/tv/${args.tmdbId}?api_key=7e781002994df832bb2bcb06c4951e32&append_to_response=season/${args.season}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": "api.themoviedb.org",
              },
            }
          );

          const asJSON = await response.json();
          const episodesDetails = [
            ...asJSON[`season/${args.season}`]["episodes"],
          ];
          delete asJSON[`season/${args.season}`];
          asJSON.episodes = episodesDetails;
          return asJSON;
        } catch (err) {
          console.error("Something went wrong");
        }
      },
    },
    getmediadata: {
      type: GetMediaDataType,
      args: {
        media_type: { type: GraphQLString },
        imdbId: { type: GraphQLString },
      },
      resolve: async (
        _: unknown,
        args: { media_type: string; imdbId: string }
      ) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/${args.media_type}/${args.imdbId}?api_key=7e781002994df832bb2bcb06c4951e32`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "X-Forwarded-For": "api.themoviedb.org",
              },
            }
          );

          const asJSON = await response.json();
          return asJSON;
        } catch (err) {
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
      type: UserType,
      args: {
        email: { type: GraphQLString },
      },
      resolve: async (parent: any, args: any) => {
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
      type: MediaType,
      args: {
        item: {
          type: MediaInputType,
        },
        userId: { type: GraphQLString },
      },
      resolve: async (parent: any, args: any) => {
        const user = await User.findOne({ _id: args.userId });
        if (user) {
          try {
            const item = user.watchlist.find(
              (item: any) => item.imdbId === args.item.imdbId
            );
            if (user.watchlist.length >= 10) {
              throw new Error(
                "Watchlist can have upto 10 items. Please remove an item to add a new one."
              );
            }
            if (!item) {
              await User.findByIdAndUpdate(
                { _id: args.userId },
                { $push: { watchlist: args.item } }
              );
            } else {
              throw new Error("Media already exists in the watchlist");
            }
            return args.item;
          } catch (err) {
            console.log(err);
            throw new Error("Item already exists in the watchlist");
          }
        }
      },
    },
    removeFromWatchlist: {
      type: MediaType,
      args: {
        imdbId: { type: GraphQLString },
        id: { type: GraphQLString },
      },
      resolve: async (parent: any, args: any) => {
        const user = await User.findOne({ _id: args.id });

        if (user) {
          try {
            const item = user.watchlist.find(
              (item: any) => item.imdbId === args.imdbId
            );

            if (item) {
              await User.findByIdAndUpdate(
                { _id: args.id },
                { $pull: { watchlist: { imdbId: args.imdbId } } }
              );
            } else {
              throw new Error("Media does not exist in the watchlist");
            }
            return item;
          } catch (err) {
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

app.use(express.json() as express.RequestHandler);
app.use(express.urlencoded({ extended: true }) as express.RequestHandler);

app.use((req: Request, res: Response, next: Function) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  res.set("Content-Type", "application/json");

  next();
});

app.options("/graphql", cors());
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema,
    mutation: Mutation,
  })
);

exports.handler = async (event: APIGatewayEvent, context: Context) => {
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

    awsServerlessExpress.proxy(server, eventProxy, {
      ...context,
      succeed: resolve,
      fail: reject,
    });
  });

  return response;
};
