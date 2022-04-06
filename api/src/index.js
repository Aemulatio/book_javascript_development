// index.js
// This is the main entry point of our application
require('dotenv').config();
const {ApolloServer, gql} = require('apollo-server-express');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const db = require('./db');
db.connect(DB_HOST);
const models = require("./models")

const notes = [
    {id: '1', content: "This is a note", author: "Adam Scott"},
    {id: '2', content: "This is another note", author: "Scot Scott"},
    {id: '3', content: "This is a third note", author: "S S"},
]


const typeDefs = gql`
    type Query {
        hello: String!
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Note {
        id: ID!
        content: String!
        author: String!
    }

    type Mutation {
        newNote(content: String!): Note!
    }

`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
        notes: async () => {
            return await models.Note.find();
        },
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        },
    },
    Mutation: {
        newNote: async (parent, args) => {
           return await models.Note.create({
               content: args.content,
               author: 'Stepan Svechnikov'
           })
        }

    }
}

const server = new ApolloServer({typeDefs, resolvers})
server.applyMiddleware({app, path: "/api"})


app.get('/', (req, res) => res.send('Hello'));
app.listen(port, () => console.log(`http://localhost:${port}${server.graphqlPath}`));
