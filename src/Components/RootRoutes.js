import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DecksList } from "./Home/DecksList";
import CreateDeckButton from "./Home/CreateDeckButton";
import CreateDeckForm from "./Form/CreateDeckForm";
import DeckView from "./DeckScreen/DeckView";
import { StudyView } from "./StudyScreen/StudyView";
import { EditDeck } from "./DeckScreen/EditDeck";
import { AddCard } from "./DeckScreen/AddCard";
import { EditCard } from "./DeckScreen/EditCard";
import NotFound from "../Layout/NotFound"


export default function RootRoutes() {
    
  return (
    <React.Fragment>
      <Routes>
      <Route path="/" element={<DecksList />} />
        <Route path="/decks/new" element={<CreateDeckForm />} />
        <Route path="/decks/:deckId" element={<DeckView />} />
        <Route path="/decks/:deckId/study" element={<StudyView />}/>
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </React.Fragment>
  );
}
