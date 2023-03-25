const mongoose = require('mongoose');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
mongoose.set("strictQuery", false);
module.exports = mongoose
    .connect(`mongodb+srv://${process.env.DB_USR}:${process.env.DB_PASS}@cluster0.gmn6g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });