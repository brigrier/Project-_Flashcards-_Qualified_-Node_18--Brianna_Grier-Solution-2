import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import { useParams, NavLink, Link } from "react-router-dom";

const DeckView = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckAndCards = async () => {
      try {
        // Fetch the deck to get the list of cards associated with it
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);

        // Set the fetched cards from the deck directly
        setCards(fetchedDeck.cards);
      } catch (error) {
        setError(error);
      }
    };

    fetchDeckAndCards();

    return () => abortController.abort();
  }, [deckId]);

 


  const handleDeckDelete = async () => {
    if (window.confirm("Are you sure you want to delete this deck? You cannot undo this action.")) {
      try {
        
        await deleteDeck(deckId);
        // You may need to handle navigation or update state after deletion
      } catch (error) {
        setError(error)
      }
    }
  };


  const handleCardDelete = async () => {
    if (window.confirm("Are you sure you want to delete this card? You cannot undo this action.")) {
      try {
        
        await deleteCard(cards.id);
        // You may need to handle navigation or update state after deletion
      } catch (error) {
        setError(error)
      }
    }
  };


  

  return (
    <main>
      <div>
        <nav aria-label="breadcrumb">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        {deck && (
          <div className="deck" key={deck.id}>
            <div className="deck-body ">
              <h5 className="deck-title">{deck.name}</h5>
              <p className="deck-text">{deck.description}</p>
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-sm btn-primary card-link">
                Edit
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-sm btn-primary card-link">
                Study
              </Link>
              <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-sm btn-primary card-link">
                Add Card
              </Link>
              <button type="button" className="btn btn-danger btn-sm" onClick={handleDeckDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
      <div>
        <br></br>
      <div>
        <h2>Cards</h2>
      </div>
        <div>
          {cards &&
            cards.map((card) => (
              <div className="card" key={card.id}>
                <div className="card-body">
                  <p className="card-text">{card.front}</p>
                  <p className="card-text">{card.back}</p>
                  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-sm btn-primary card-link">
                    Edit
                  </Link>
                  <button type="button" class="btn btn-danger btn-sm" onClick={handleCardDelete}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default DeckView;


