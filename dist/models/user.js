"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    // userId:String,
    watchlist: {
        type: Array,
    },
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
