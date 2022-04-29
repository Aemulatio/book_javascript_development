// index.js
// This is the main entry point of our application

import React from "react";
import {createRoot} from "react-dom/client";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "apollo-link-context";

const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({uri});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('toketn') || ""
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages/>
        </ApolloProvider>
    );
};

createRoot(document.querySelector("#root")).render(<App/>)