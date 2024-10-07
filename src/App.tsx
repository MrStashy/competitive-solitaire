import "./App.css";
import PlayingBoard from "./components/PlayingBoard";
import TopRow from "./components/TopRow";
import Tableau from "./components/Tableau";
import ControlModule from "./components/ControlModule";
import rankMap from "./utils/cardRankMap";
import { getNewDeck, getNewFullDeck } from "./utils/apiFunctions";
import { useState } from "react";
import { PileOfCards, TableauColumns } from "./utils/types";
import { DndContext } from '@dnd-kit/core';
import { DragEndEvent } from "@dnd-kit/core";
import markColumnGroups from "./utils/markColumnGroups";


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
    const newColumns: TableauColumns = {};

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
      newColumns[i] = markColumnGroups(currentColumn);
    }
    console.log(newColumns)
    setColumns(newColumns);
    setDealt(true);
  }

  if (gameDeck.length && !dealt) {
    dealCards();
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event
    let draggedCardCode: string = ''
    let originatingColNum: string = ''
    let destinationColNum: string = ''
    let draggedCardColourIsBlack: boolean = false
    let destinationCardColourIsBlack: boolean = false
    let draggedCardRank: number = 0
    let destinationCardRank: number = 0
    const columnsCopy: TableauColumns = {}

    if (over) {
      destinationColNum = over.id.toString()
    } else {
      return
    }

    for (let i = 1; i < 8; i++) {
      columnsCopy[i] = [...columns[i]]
    }

    if (typeof active.id === 'string') {
      [draggedCardCode, originatingColNum] = active.id.split('-');
    }

    draggedCardRank = rankMap[draggedCardCode[0]]
    if(draggedCardCode[1] === 'C' || draggedCardCode[1] === 'S') {
      draggedCardColourIsBlack = true
    } 

    const destinationCol = columnsCopy[Number(destinationColNum)]
    const destinationCardCode = destinationCol[destinationCol.length - 1].code
    if(destinationCardCode[1] === 'C' || destinationCardCode[1] === 'S') {
      destinationCardColourIsBlack = true
    } 
    destinationCardRank = rankMap[destinationCardCode[0]]

    if (destinationCardRank - draggedCardRank === 1 && draggedCardColourIsBlack !== destinationCardColourIsBlack) {
       const removedCard = columnsCopy[Number(originatingColNum)].pop()
       if(removedCard) {
        destinationCol.push(removedCard)
       }
    }

    setColumns(columnsCopy)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <PlayingBoard>
      <TopRow stockPile={stockPile} />
      <Tableau columns={columns}/>
      <ControlModule handleNewGameClick={handleNewGameClick} />
    </PlayingBoard>
    </DndContext>
  );
}



export default App;
