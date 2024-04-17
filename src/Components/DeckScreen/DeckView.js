import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteCard, deleteDeck } from "../../utils/api";

export const DeckView = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([]);
  const [error, setError] = useState(undefined);

   useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    readDeck(deckId, signal)
      .then((response) => {
               setDeck(response);
      })
      .catch((error) => {
             setError(error);
      });

       return () => abortController.abort();
  }, []);

  const { cards } = deck;
   const list = Array.isArray(cards)
    ? cards.map((card) => (
        <div key={card.id}>
                   <p className="cardFront">Front:<br/> <span>{card.front}</span> </p>
        <p className="cardBack">Back: <br/><span>{card.back}</span> </p>
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="editCard"
          >
            edit
          </Link>
          <button
            onClick={() => deleteThisCard(card.id)}
            className="deleteCard"
          >
            Delete
          </button>
        </div>
      ))
    : null;

  function deleteEntireDeck(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Deck?"
    );
    if (confirmed) {
      deleteDeck(id);
      navigate(`/`);
    } else {
      return null;
    }
  }

  function deleteThisCard(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirmed) {
      deleteCard(id);
      window.location.reload();
    } else {
      return null;
    }
  }
  return (
    <div>
      <div className="navbar">
        <span>
          <Link to={`/`}>Home</Link> / {deck.name}
        </span>
      </div>

      <div style={{ paddingTop: "20px" }}>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`}>Edit</Link>
        <Link to={`/decks/${deckId}/study`}>Study</Link>
        <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
        <button onClick={() => deleteEntireDeck(deck.id)}>Delete </button>
      </div>
      <br />
      <div>
        <h1>{deck && `Cards`}</h1>
        { deck && list}
      </div>
    </div>
  );
};

export default DeckView;


