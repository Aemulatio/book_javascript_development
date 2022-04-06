// index.js
// This is the main entry point of our application
require('dotenv').config();
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require("./schema")
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const db = require('./db');
db.connect(DB_HOST);
const models = require("./models")
const resolvers = require("./resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ()=>{
        return {models};
    }
})
server.applyMiddleware({app, path: "/api"})


app.get('/', (req, res) => res.send('Hello'));
app.listen(port, () => console.log(`http://localhost:${port}${server.graphqlPath}`));
