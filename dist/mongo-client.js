"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const express = require('express');
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.set("strictQuery", false);
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    try {
        const client = await mongoose.connect(`mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0.jwwauv4.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        cachedDb = client;
        // app.listen(process.env.PORT || PORT_NO)
        return cachedDb;
    }
    catch (err) {
        throw new Error(`${err}`);
    }
}
module.exports = connectToDatabase;
