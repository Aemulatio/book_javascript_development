import React from "react";
import { useParams } from "react-router-dom";

const NotePage = () => {
  const props = useParams();

  return (
    <div>
      <p>
        ID: {props.id}
      </p>
    </div>
  );
};

export default NotePage;