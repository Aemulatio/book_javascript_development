// index.js
// This is the main entry point of our application

import React from "react";
import ReactDOM from "react-dom";

import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

const App = () => {
    return (
        <div>
            <GlobalStyle/>
            <Pages/>
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector("#root"))