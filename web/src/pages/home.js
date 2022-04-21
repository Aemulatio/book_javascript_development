import React from "react";
import {useQuery, gql} from "@apollo/client";

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Button from "../components/Button";


const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const Home = () => {
    const {data, loading, error, fetchMore} = useQuery(GET_NOTES);

    if (loading) return (
        <>
            <p>Loading...</p>
            {console.log(error)}
        </>);

    if (error) return <p>Error!</p>;

    return (
        <div>
            {console.log(data)}
            <p>Data loaded!</p>
            <Button>Click me</Button>
        </div>
    )
}
export default Home