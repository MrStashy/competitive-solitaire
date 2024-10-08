import "./App.css";
import PlayingBoard from "./components/PlayingBoard";
import TopRow from "./components/TopRow";
import Tableau from "./components/Tableau";
import ControlModule from "./components/ControlModule";
import rankMap from "./utils/cardRankMap";
import { getNewDeck, getNewFullDeck } from "./utils/apiFunctions";
import { useState } from "react";
import { PileOfCards, PlayingCard, TableauColumns } from "./utils/types";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import markColumnGroups from "./utils/markColumnGroups";
import markRevealedCards from "./utils/markRevealedCards";

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
      markRevealedCards(currentColumn)
      newColumns[i] = markColumnGroups(currentColumn);
    }
    setColumns(newColumns)
    setDealt(true);
  }

  if (gameDeck.length && !dealt) {
    dealCards();
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const columnsCopy: TableauColumns = {};
    let draggedCardCode = "";
    let originatingColNum = "";
    let destinationColNum = "";
    let originatingCol: PileOfCards = [];
    let destinationCol: PileOfCards = [];
    let draggedCardRank = 0;
    let draggedCardIsBlack = false;
    let destinationCard: PlayingCard;
    let destinationCardRank = 0;
    let destinationCardIsBlack = false;
    let numOfDraggedCards = 0;
    let draggedCardIndex = 0

    if (!over) {
      return;
    } else {
      destinationColNum = over.id.toString();
    }

    for (let i = 1; i < 8; i++) {
      columnsCopy[i] = [...columns[i]];
    }

    if (typeof active.id === "string") {
      [draggedCardCode, originatingColNum] = active.id.split("-");
      draggedCardRank = rankMap[draggedCardCode[0]];
      originatingCol = columnsCopy[Number(originatingColNum)];
      draggedCardIsBlack =
        draggedCardCode[1] === "C" || draggedCardCode[1] === "S";
    }

    destinationCol = columnsCopy[Number(destinationColNum)];

    if(destinationCol.length > 0) {
      destinationCard = destinationCol[destinationCol.length - 1];
      destinationCardRank = rankMap[destinationCard.code[0]];
      destinationCardIsBlack =
        destinationCard.code[1] === "S" || destinationCard.code[1] === "C";
    }
    
    const draggedCard = originatingCol.find((card) => card.code === draggedCardCode)
    if (draggedCard) {
      numOfDraggedCards = draggedCard.draggableGroup.length + 1
      draggedCardIndex = originatingCol.indexOf(draggedCard)
    } 
    const allDraggedCards = originatingCol.splice(draggedCardIndex, numOfDraggedCards)

    if (draggedCardIsBlack !== destinationCardIsBlack && destinationCardRank - draggedCardRank === 1 || destinationCol.length === 0 && draggedCardRank === 13) {
      const newDestinationColArr = destinationCol.concat(allDraggedCards)
      columnsCopy[Number(destinationColNum)] = newDestinationColArr
    } else {
      return
    }
    for (let i = 1; i < 8; i++) {
      markColumnGroups(columnsCopy[i])
    }
    setColumns(columnsCopy);
  }

  function handleDragStart (event: DragStartEvent) {
    if(event.active.id === "3D-4") {
      console.log("event cancelling")
      return
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <PlayingBoard>
        <TopRow stockPile={stockPile} />
        <Tableau columns={columns} />
        <ControlModule handleNewGameClick={handleNewGameClick} />
      </PlayingBoard>
    </DndContext>
  );
}

export default App;
