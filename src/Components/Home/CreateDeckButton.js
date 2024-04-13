import React from "react";
import { useNavigate } from "react-router-dom";

const CreateDeckButton = () => {

   const navigate = useNavigate();
  const handleCreateClick = () => {
   

    navigate("/decks/new");
  };

  return <button type="button" className="btn btn-secondary" onClick={handleCreateClick}>Create a New Deck</button>;
};

export default CreateDeckButton;
