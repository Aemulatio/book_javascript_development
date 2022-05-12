import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet
} from "react-router-dom";

import Layout from "../components/Layout";

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import NotePage from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import { useQuery, gql } from "@apollo/client";


const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path='/mynotes' element={<PrivateRoute/>}>
            <Route exact path='/mynotes' element={<MyNotes/>}/>
          </Route>
          <Route exact path='/favorites' element={<PrivateRoute/>}>
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route path="/note/:id" element={<NotePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Layout>
    </Router>
  );
};

// const PrivateRoute = ({ component: Component, ...rest }) => {
const PrivateRoute = () => {
  // const { loading, error, data } = useQuery(gql`
  //     {
  //         isLoggedIn @client
  //     }
  // `);
  //
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>;

  // return (
  //   <>
  //     <Route
  //       {...rest}
  //       render={props =>
  //         data.isLoggedIn === true ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect to={{
  //             pathname: "/signin",
  //             state: { from: props.location }
  //           }}
  //           />
  //         )
  //       }
  //     />
  //   </>
  // );

  const data = { isLoggedIn: localStorage.token !== undefined };

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return data.isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default Pages;