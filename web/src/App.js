// index.js
// This is the main entry point of our application

import React from "react";
import { createRoot } from "react-dom/client";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";


const data = {
  isLoggedIn: !!localStorage.getItem("token")
};

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache({ typePolicies: { Query: { data } }});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});


// cache.modify({ data });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

createRoot(document.querySelector("#root")).render(<App />);