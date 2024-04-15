import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../utils/api";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckAndCards = async () => {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
      } catch (error) {
        setError(error);
      }
    };

    fetchDeckAndCards();

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCardToUpdate = async () => {
      try {
        const fetchedCard = await readCard(cardId, abortController.signal);
        setFront(fetchedCard.front);
        setBack(fetchedCard.back);
      } catch (error) {
        setError(error);
      }
    };

    fetchCardToUpdate();

    return () => abortController.abort();
  }, [cardId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCard = { front, back, deckId };

    try {
      await updateCard({ ...updatedCard, id: cardId });
      navigate(`/decks/${deckId}`);
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
                <NavLink to={`/decks/${deckId}`}>{deck?.name}</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <NavLink to={`/decks/${deckId}/cards/${cardId}/edit`}>
                  Edit Card {cardId}
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div>
        <h2>Edit Card</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <input
            type="text"
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front side of card"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <input
            type="text"
            id="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back side of card"
            required
            className="form-control"
          />
        </div>
        <button className="btn btn-sm btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
        <button className="btn btn-sm btn-secondary ml-2" type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </main>
  );
};
