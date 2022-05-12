import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import NoteForm from "../components/NoteForm";

const NewNote = props => {
  useEffect(() => {
    document.title = "New Note - Notedly";
  });
  return <NoteForm />;
};

export default NewNote;