import "./App.css";
import PlayingBoard from "./components/PlayingBoard";
import TopRow from "./components/TopRow";
import Tableau from "./components/Tableau";
import ControlModule from "./components/ControlModule";
import { getNewDeck, getNewFullDeck } from "./utils/apiFunctions";
import { useState } from "react";
import { PileOfCards, TableauColumns } from "./utils/types";
import { DndContext } from '@dnd-kit/core';


function App() {
  const [gameDeck, setDeck] = useState<PileOfCards>([]);
  const [stockPile, setStockPile] = useState<PileOfCards>([]);
  const [dealt, setDealt] = useState<boolean>(false);
  const [columns, setColumns] = useState<TableauColumns>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  });

  async function handleNewGameClick() {
    const newDeckId = await getNewDeck();
    const deck = await getNewFullDeck(newDeckId);
    setDeck(deck);
  }

  function dealCards() {
    const deckCopy: PileOfCards = [...gameDeck];
    const newStockPile: PileOfCards = [];
    const newColumns: TableauColumns = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
    };

    for (let i = 0; i < 24; i++) {
      const card = deckCopy.shift();
      if (card) {
        newStockPile.push(card);
      }
    }
    setStockPile(newStockPile);

    for (let i = 1 as keyof TableauColumns; i < 8; i++) {
      const currentColumn = [];
      for (let j = 0; j < i; j++) {
        const card = deckCopy.shift();
        if (card) {
          currentColumn.push(card);
        }
      }
      newColumns[i] = currentColumn;
    }
    setColumns(newColumns);
    setDealt(true);
  }

  if (gameDeck.length && !dealt) {
    dealCards();
  }

  return (
    <DndContext>
    <PlayingBoard>
      <TopRow stockPile={stockPile} />
      <Tableau columns={columns} />
      <ControlModule handleNewGameClick={handleNewGameClick} />
    </PlayingBoard>
    </DndContext>
  );
}

export default App;
