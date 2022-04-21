// index.js
// This is the main entry point of our application

import React from "react";
import {createRoot} from "react-dom/client";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const uri = process.env.API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri, cache, connectToDevTools: true
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