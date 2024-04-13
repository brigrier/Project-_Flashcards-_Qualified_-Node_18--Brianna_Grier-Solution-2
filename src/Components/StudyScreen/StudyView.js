import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

export const StudyView = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeckAndCards = async () => {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
      } catch (error) {
        setError(error);
      }
    };

    fetchDeckAndCards();

    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchCardDetails = async () => {
      try {
        if (cards.length === 0) {
          const updatedCards = [];
          for (const card of cards) {
            const fetchedCard = await readCard(card.id, abortController.signal);
            updatedCards.push(fetchedCard);
          }
          setCards(updatedCards);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchCardDetails();

    return () => abortController.abort();
  }, [deckId]);

  const handleNext = () => {
    if (currentIndex === cards.length - 1) {
      const shouldRestart = window.confirm(
        "You've reached the end of the deck. Would you like to restart?"
      );
      if (shouldRestart) {
        setCurrentIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddCards = () => {
    navigate(`/decks/${deckId}/cards/new`);
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
                <NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <NavLink to={`/decks/${deckId}/study`}>Study</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </div>

      <div>
        {deck && <h2>{deck.name}: Study </h2>}
      </div>

      <div>
        <h3>Cards</h3>
        {cards && cards.length > 2 ? (
          <div>
            <div className="card">
              <div className="card-body">
                <h4>Card {currentIndex + 1} of {cards.length}</h4>
                <p className="card-text">
                  {isFlipped ? cards[currentIndex].back : cards[currentIndex].front}
                </p>
              </div>
            </div>
            <br />
            <div>
              <button className="btn btn-sm btn-secondary ml-2" onClick={handleFlip}>
                Flip
              </button>
              {isFlipped && (
                <button className="btn btn-sm btn-primary ml-2" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>Not enough cards to study this deck. Add a card below:</p>
            <button className="btn btn-primary" onClick={handleAddCards}>
              Add Card
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default StudyView;

