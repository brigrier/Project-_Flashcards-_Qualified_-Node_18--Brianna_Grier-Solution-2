import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";

export const AddCard = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate(); // Correctly invoke useNavigate

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckAndCards = async () => {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
        setName(fetchedDeck.name);
        setDescription(fetchedDeck.description);
        setCards(fetchedDeck.cards);
      } catch (error) {
        setError(error);
      }
    };

    fetchDeckAndCards();

    return () => abortController.abort();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCard = { front, back, deckId }; // Include deckId along with new card data

    try {
      await createCard(deckId, newCard); // Pass deckId along with newCard
      navigate(`/decks/${deckId}`); // Navigate back to the deck after adding the card
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
                <NavLink to={`/decks/${deckId}/cards/new`}>Add Card</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div>
        <h2>Add Card</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)} // Use setFront for front input
            placeholder="Front side of card"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)} // Use setBack for back input
            placeholder="Back side of card"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-sm btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-sm btn-secondary ml-2"
          onClick={() => navigate("/")}
        >
          Done
        </button>
      </form>
    </main>
  );
};
