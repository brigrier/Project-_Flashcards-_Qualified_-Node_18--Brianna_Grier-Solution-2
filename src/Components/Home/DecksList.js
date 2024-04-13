import React, { useEffect, useState } from "react";
import { listDecks, deleteDeck } from "../../utils/api";
import { Link } from "react-router-dom";
import CreateDeckButton from "./CreateDeckButton";
import { useParams } from "react-router-dom";

export const DecksList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDecks = async () => {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        setDecks(fetchedDecks);
      } catch (error) {
        setError(error);
      }
    };

    fetchDecks();

    return () => abortController.abort();
  }, []);

  const handleDelete = async (deckId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You cannot undo this action."
      )
    ) {
      try {
        await deleteDeck(deckId);
        setDecks(decks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        setError(error);
      }
    }
  };

  const deckItems = decks.map((deck) => (
    <div className="deck border mb-4" key={deck.id}>
      <div className="deck-body m-3">
        <h5 className="deck-title">{deck.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {deck.cards.length} cards
        </h6>
        <p className="deck-text">{deck.description}</p>
        <Link
          to={`/decks/${deck.id}`}
          className="btn-primary btn btn-sm card-link"
        >
          View
        </Link>
        <Link
          to={`/decks/${deck.id}/study`}
          className="btn-primary btn btn-sm card-link"
        >
          Study
        </Link>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(deck.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <main>
      <div>
        <section>
          <CreateDeckButton />
        </section>
      </div>
     
     <br></br>

      <div>
        <section>{deckItems}</section>
      </div>
    </main>
  );
};

