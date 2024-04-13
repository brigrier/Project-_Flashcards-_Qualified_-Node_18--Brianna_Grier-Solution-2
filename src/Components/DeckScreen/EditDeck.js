import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../../utils/api";
import { useNavigate, NavLink, useParams } from "react-router-dom";

export const EditDeck = () => {
  const navigate = useNavigate();
  const { deckId } = useParams(); // Correctly invoke useParams
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckAndCards = async () => {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
        setName(fetchedDeck.name); // Set name and description from fetched deck
        setDescription(fetchedDeck.description);
      } catch (error) {
        setError(error);
      }
    };

    fetchDeckAndCards();

    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };

    try {
      await updateDeck({ ...newDeck, id: deckId }); // Pass deckId along with newDeck
      navigate("/decks/" + deckId); // Navigate to the deck after editing
    } catch (error) {
      setError(error)
    }
  };

  return (
    <main>
      <div>
        {deck && (
          <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to={`/decks/${deckId}`}>{name}</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <NavLink to={`/decks/${deckId}/edit`}>Edit Deck</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div>
        <h2>Edit Deck</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            required
            className="form-control"
          ></textarea>
        </div>
        <div>
          <button type="submit" className="btn btn-sm btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary ml-2"
            onClick={() => navigate(`/decks/${deckId}`)}
            
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};
