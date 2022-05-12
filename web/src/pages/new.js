import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";
import { useNavigate } from "react-router-dom";

const NEW_NOTE = gql`
    mutation newNote($content: String!){
        newNote (content: $content){
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                id
                username
            }
        }
    }
`;

const NewNote = props => {
  useEffect(() => {
    document.title = "New Note - Notedly";
  });

  const navigate = useNavigate();
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    onCompleted: data => {
      navigate(`note/${data.newNote.id}`);
    }
  });

  return (
    <>
      {loading && <p>Loading....</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </>
  );
};

export default NewNote;