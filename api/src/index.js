// index.js
// This is the main entry point of our application
const {ApolloServer, gql} = require('apollo-server-express');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const typeDefs = gql`
    type Query{
        hello: String
    }`;

const resolvers = {
    Query: {
        hello: () => "Hello world!"
    }
}

const server = new ApolloServer({typeDefs, resolvers})
server.applyMiddleware({app, path:"/api"})


app.get('/', (req, res) => res.send('Hello'));
app.listen(port, () => console.log(`http://localhost:${port}${server.graphqlPath}`));
