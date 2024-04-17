import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
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
      <div  className="card mb-4">
        <div className="card-body">
        <div key={card.id}>
                   <p className="cardFront" >Front:<br/> <span>{card.front}</span> </p>
        <p className="cardBack">Back: <br/><span>{card.back}</span> </p>
          <Link
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
            className="editCard btn btn-sm btn-primary card-link"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteThisCard(card.id)}
            className="deleteCard btn btn-sm btn-danger"
          >
            Delete
          </button>
</div>
          </div>
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
      <div>
      <nav aria-label="breadcrumb">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="breadcrumb-item">
                <NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink>
              </li>
            </ul>
          </nav>
      </div>

      <div style={{ paddingTop: "20px" }}>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <Link className="btn btn-sm btn-primary card-link" to={`/decks/${deckId}/edit`}>Edit</Link>
        <Link className="btn btn-sm btn-primary card-link" to={`/decks/${deckId}/study`}>Study</Link>
        <Link className="btn btn-sm btn-primary card-link" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
        <button className="btn btn-sm btn-danger" onClick={() => deleteEntireDeck(deck.id)}>Delete </button>
      </div>
      <br />
      <div>
        <h3>{deck && `Cards`}</h3>
        <div>
          <div>
        { deck && list}
        </div>
        </div>
      </div>
    </div>
  );
};

export default DeckView;


