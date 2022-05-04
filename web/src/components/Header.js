import React from "react";
import logo from "../img/logo.svg";
import styled from "styled-components";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";

const IS_LOGGED_IN = gql`
    query ReadLogged($id: String!) {
        isLoggedIn(id: $id){
            id
            jwt
        }
    }
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = () => {
  console.log(window.localStorage.token);
  // const client = useApolloClient();

  // const {loading, error, data } = useQuery(IS_LOGGED_IN, {variables: window.localStorage.token});
  /*const { data } = client.readQuery({
    query: gql`
        query ReadLogged($id: String!) {
            isLoggedIn(id: $id){
                id
                jwt
            }
        }
    `,
    variables: {
      id: localStorage.token
    }

  });*/


  // console.log(loading, error, data);
  const data = { isLoggedIn: 1 };
  // if (loading) return <p>Loading...</p>;
  //
  // if (error) return <p>Error! {console.log(error)}</p>;


  return (
    <HeaderBar>
      <img src={logo} alt="logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <p>Log Out</p>
        ) : (
          <p>
            <Link to={"/signin"}>Sign In</Link> or{" "}
            <Link to={"/signup"}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default Header;