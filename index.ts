import express from 'express';
import { Request, Response } from 'express';
import { Context, APIGatewayEvent, APIGatewayProxyCallback, APIGatewayProxyResult } from 'aws-lambda';

const app = express();
const connectToDatabase = require('./mongo-client');
const awsServerlessExpress = require('aws-serverless-express');

const PORT_NO = 3001;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const expressGraphQL = require('express-graphql').graphqlHTTP;
const User = require('./models/user');
const cors = require('cors');


const { GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLInt,
    GraphQLInputObjectType,
    GraphQLString } = require('graphql');



const MediaType = new GraphQLObjectType({
    name: 'MediaType',
    fields: () => ({
        imdbId: { type: GraphQLString },
        title: { type: GraphQLString },
        poster: { type: GraphQLString },
        plot: { type: GraphQLString },
        runtime: { type: GraphQLString },
        year: { type: GraphQLString },
        genre: { type: GraphQLString },
        media: { type: GraphQLString },
    })
})

const MediaInputType = new GraphQLInputObjectType({
    name: 'MediaInputType',
    fields: () => ({
        imdbId: { type: GraphQLString },
        title: { type: GraphQLString },
        poster: { type: GraphQLString },
        plot: { type: GraphQLString },
        runtime: { type: GraphQLString },
        year: { type: GraphQLString },
        genre: { type: GraphQLString },
        media: { type: GraphQLString },
    })
})
const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLString },
        email: { type: GraphQLString },
        watchlist: { type: new GraphQLList(MediaType) },
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        watchlist: {
            type: new GraphQLList(MediaType),
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (parent: any, args: any) => {
                const res = await User.findOne({ _id: args.id })
                return res.watchlist
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createOrGetUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
            },
            resolve: async (parent: any, args: any) => {
                
                const user = await User.findOne({ email: args.email })
                if (user) {
                    return {
                        id: user._id,
                        email: user.email,
                    }
                }
                const newUser = {
                    email: args.email,
                    watchlist: []
                }
                const registerUser = new User(newUser);
                const user_id = await registerUser.save();
                return {
                    id: user_id._id,
                    email: args.email
                };
            }
        },
        addToWatchlist: {
            type: MediaType,
            args: {
                item: {
                    type: MediaInputType
                },
                userId: { type: GraphQLString }
            },
            resolve: async (parent: any, args: any) => {

                const user = await User.findOne({ _id: args.userId })
                if (user) {
                    try {
                        const item = user.watchlist.find((item: any) => item.imdbId === args.item.imdbId)

                        if (!item) {
                            await User.findByIdAndUpdate({ _id: args.userId }, { "$push": { "watchlist": args.item } })


                        } else {
                            throw new Error('Media already exists in the watchlist')
                        }
                        return args.item
                    }
                    catch (err) {

                        console.log(err)
                        throw new Error('Item already exists in the watchlist')
                    }

                }

            }
        },
        removeFromWatchlist: {
            type: MediaType,
            args: {
                imdbId: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            resolve: async (parent: any, args: any) => {

                const user = await User.findOne({ _id: args.id })

                if (user) {
                    try {

                        const item = user.watchlist.find((item: any) => item.imdbId === args.imdbId)

                        if (item) {
                            await User.findByIdAndUpdate({ _id: args.id }, { "$pull": { "watchlist": { imdbId: args.imdbId } } })

                        } else {
                            throw new Error('Media does not exist in the watchlist')
                        }
                        return item
                    }
                    catch (err) {

                        console.log(err)
                        throw new Error('Media does not exist in the watchlist')
                    }
                }
            }
        }

    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use((req: Request, res: Response, next: Function) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS')
    res.set('Content-Type', 'application/json');

    next()
})

app.options('/graphql', cors())
app.use('/graphql', expressGraphQL({
    graphiql: true,
    schema,
    mutation: Mutation,
}));



exports.handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
    await connectToDatabase();

    console.log("Connection successful", event);
    const server = awsServerlessExpress.createServer(app);

    const response = await new Promise((resolve, reject) => {
        const { httpMethod, path, headers, body } = event;
        const queryStringParameters = event.queryStringParameters || {};

        console.log(event);
        const eventProxy = {
            httpMethod,
            path :"/graphql",
            headers,
            queryStringParameters,
            body: body,
        };

        awsServerlessExpress.proxy(server, eventProxy, {
            ...context,
            succeed: resolve,
            fail: reject
        });
    });
    console.log(response);

    return response;
}