import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { createDeck } from "../../utils/api"; // Import the createDeck function

const CreateDeckForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };

    try {
      await createDeck(newDeck); // Call the createDeck function to create a new deck
      navigate("/"); // After successful creation, navigate to the DeckList page to see the updated data
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ul className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <NavLink to="/decks/new">Create Deck</NavLink>
          </li>
        </ul>
      </nav>
      <h2>Create a Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of the deck"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description of the deck"
            required
            className="form-control"
          ></textarea>
        </div>
        <button className="btn btn-sm btn-primary" type="submit">
          Create
        </button>
        <button
          className="btn btn-sm btn-secondary ml-2"
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateDeckForm;

