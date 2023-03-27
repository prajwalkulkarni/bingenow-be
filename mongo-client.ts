const mongoose = require('mongoose');
const express = require('express');
const app = express();
import { Request, Response } from 'express'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.set("strictQuery", false);

const PORT_NO = 3001;
let cachedDb: any = null;

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

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }


    try {
        const client = await mongoose.connect(`mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0.gmn6g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        cachedDb = client.db();


        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))


        app.use((req: Request, res: Response, next: Function) => {

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS')

            next()
        })

        app.options('/graphql', cors())
        app.use('/graphql', expressGraphQL({
            graphiql: true,
            schema,
            mutation: Mutation,
        }));

        app.listen(process.env.PORT || PORT_NO)
        return cachedDb;
    }
    catch (err) {
        throw new Error("Error connecting to database");
    }
}
module.exports = connectToDatabase;