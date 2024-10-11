import "./App.css";
import PlayingBoard from "./components/PlayingBoard";
import TopRow from "./components/TopRow";
import Tableau from "./components/Tableau";
import ControlModule from "./components/ControlModule";
import rankMap from "./utils/cardRankMap";
import { getNewDeck, getNewFullDeck } from "./utils/apiFunctions";
import { useState } from "react";
import {
  PileOfCards,
  PlayingCard,
  TableauColumns,
  Foundations,
} from "./utils/types";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core";
import markColumnGroups from "./utils/markColumnGroups";
import markRevealedCards from "./utils/markRevealedCards";
import { Slab } from "react-loading-indicators";

function App() {
  const [gameDeck, setDeck] = useState<PileOfCards>([]);
  const [stockPile, setStockPile] = useState<PileOfCards>([]);
  const [wastePile, setWastePile] = useState<PileOfCards>([]);
  const [dealt, setDealt] = useState<boolean>(false);
  const [columns, setColumns] = useState<TableauColumns>({});
  const [currentlyDraggedCards, setCurrentlyDraggedCards] =
    useState<PileOfCards>([]);
  const [foundations, setFoundations] = useState<Foundations>({1: [], 2: [], 3: [], 4: []});
  const [loadingNewGame, setLoadingNewGame] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  async function handleNewGameClick() {
    setLoadingNewGame(true)
    const newDeckId = await getNewDeck();
    const deck = await getNewFullDeck(newDeckId);
    setDeck(deck);
  }

  function dealCards() {
    const deckCopy: PileOfCards = [...gameDeck];
    const newStockPile: PileOfCards = [];
    const newColumns: TableauColumns = {};
    const newFoundations: Foundations = {};

    for (let i = 0; i < 24; i++) {
      const card = deckCopy.shift();
      if (card) {
        card.revealed = false;
        newStockPile.push(card);
      }
    }
    setStockPile(newStockPile);

    for (let i = 1; i < 8; i++) {
      const currentColumn = [];
      for (let j = 0; j < i; j++) {
        const card = deckCopy.shift();
        if (card) {
          currentColumn.push(card);
        }
      }
      markRevealedCards(currentColumn);
      newColumns[i] = markColumnGroups(currentColumn);
    }

    for (let i = 1; i < 5; i++) {
      newFoundations[i] = [];
    }
    setFoundations(newFoundations);
    setColumns(newColumns);
    setDealt(true);
    setLoadingNewGame(false)
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
    let draggedCardIndex = 0;

    setCurrentlyDraggedCards([]);

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

    if (originatingColNum === "0" && typeof over.id === "number") {
      handleWasteToColDrag(draggedCardCode, over.id);
      return;
    }

    if (typeof over.id === "string" && over.id.includes("F")) {
      handleDragToFoundation(draggedCardCode, over.id);
      return;
    }

    destinationCol = columnsCopy[Number(destinationColNum)];

    if (destinationCol.length > 0) {
      destinationCard = destinationCol[destinationCol.length - 1];
      destinationCardRank = rankMap[destinationCard.code[0]];
      destinationCardIsBlack =
        destinationCard.code[1] === "S" || destinationCard.code[1] === "C";
    }

    const draggedCard = originatingCol.find(
      (card) => card.code === draggedCardCode
    );
    if (draggedCard) {
      numOfDraggedCards = draggedCard.draggableGroup.length + 1;
      draggedCardIndex = originatingCol.indexOf(draggedCard);
    }
    const allDraggedCards = originatingCol.splice(
      draggedCardIndex,
      numOfDraggedCards
    );

    if (
      (draggedCardIsBlack !== destinationCardIsBlack &&
        destinationCardRank - draggedCardRank === 1) ||
      (destinationCol.length === 0 && draggedCardRank === 13)
    ) {
      const newDestinationColArr = destinationCol.concat(allDraggedCards);
      columnsCopy[Number(destinationColNum)] = newDestinationColArr;
    } else {
      return;
    }
    for (let i = 1; i < 8; i++) {
      markColumnGroups(columnsCopy[i]);
    }
    setColumns(columnsCopy);
  }

  function handleTableauColClick(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;
    const { id } = target;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, colNum] = id.split("-");
    const colCopy = [...columns[Number(colNum)]];
    colCopy[colCopy.length - 1].revealed = true;
    setColumns({ ...columns });
  }

  function handleStockClick() {
    const stockCopy = [...stockPile];
    const wasteCopy = [...wastePile];

    if (!stockCopy.length) {
      setStockPile(wasteCopy.reverse());
      setWastePile([]);
      return;
    }

    const cardsToTransfer = stockCopy.splice(stockCopy.length - 3);
    const newWastePile = wasteCopy.concat(cardsToTransfer.reverse());
    newWastePile.map((card) => {
      card.revealed = true;
    });

    setStockPile(stockCopy);
    setWastePile(newWastePile);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    let colNum: string;
    let cardCode: string;
    let card: PlayingCard | undefined;
    let colCopy: PileOfCards = [];
    let indexOfCard: number;

    if (typeof active.id === "string") {
      [cardCode, colNum] = active.id.split("-");
      if (colNum === "0") {
        return;
      }
      colCopy = [...columns[Number(colNum)]];
      card = colCopy.find((card) => card.code.includes(cardCode));
      if (!card) {
        return;
      }
      indexOfCard = colCopy.indexOf(card);
    } else {
      return;
    }

    const currentlyDraggedCards = [card].concat(
      colCopy.splice(indexOfCard + 1, card.draggableGroup.length + 1)
    );

    setCurrentlyDraggedCards(currentlyDraggedCards);
  }

  function handleWasteToColDrag(
    draggedCardCode: string,
    destinationColNum: number
  ) {
    const destinationColCopy = [...columns[destinationColNum]];
    const wastePileCopy = [...wastePile];

    if (destinationColCopy.length) {
      const destinationCard = destinationColCopy[destinationColCopy.length - 1];
      const destinationCardIsBlack =
        destinationCard.code[1] === "S" || destinationCard.code[1] === "C";
      const draggedCardIsBlack =
        draggedCardCode[1] === "S" || draggedCardCode[1] === "C";
      const destinationCardRank = rankMap[destinationCard.code[0]];
      const draggedCardRank = rankMap[draggedCardCode[0]];

      if (
        destinationCardIsBlack !== draggedCardIsBlack &&
        draggedCardRank - destinationCardRank === -1
      ) {
        const cardFromWastePile = wastePileCopy.pop();

        if (cardFromWastePile) {
          destinationColCopy.push(cardFromWastePile);
        }
      }
    } else {
      const cardFromWastePile = wastePileCopy.pop();
      if (cardFromWastePile) {
        destinationColCopy.push(cardFromWastePile);
      }
    }

    markColumnGroups(destinationColCopy);
    setWastePile(wastePileCopy);
    setColumns({ ...columns, [destinationColNum]: destinationColCopy });
  }

  function handleDragToFoundation(draggedCardCode: string, overId: string) {
    let foundCardAndOrigin: [number, PlayingCard | undefined];
    const wastePileCopy = [...wastePile];
    const columnsCopy = { ...columns };
    const foundationsCopy = { ...foundations };
    const destinationFoundationNum = Number(overId[1]);

    foundCardAndOrigin = [
      0,
      wastePileCopy.find((card) => card.code === draggedCardCode),
    ];

    if (!foundCardAndOrigin[1]) {
      for (let i = 1; i < 8; i++) {
        foundCardAndOrigin = [
          i,
          columnsCopy[i].find((card) => card.code === draggedCardCode),
        ];
        if (foundCardAndOrigin[1]) {
          break;
        }
      }
    }
    if (!foundCardAndOrigin[1]) {
      return;
    }

    const destinationFoundation = foundationsCopy[destinationFoundationNum];
    const destinationCard =
      destinationFoundation[destinationFoundation.length - 1];
    const draggedCardRank = rankMap[foundCardAndOrigin[1].code[0]];

    if (draggedCardRank !== 1) {
      const destinationCardRank = rankMap[destinationCard.code[0]];
      if (
        foundCardAndOrigin[1].code[1] !== destinationCard.code[1] ||
        draggedCardRank - destinationCardRank !== 1 ||
        !destinationFoundation.length
      ) {
        return;
      }
    }

    if (foundCardAndOrigin[0] === 0) {
      wastePileCopy.pop();
      setWastePile(wastePileCopy);
    } else {
      columnsCopy[foundCardAndOrigin[0]].pop();
      markColumnGroups(columnsCopy[foundCardAndOrigin[0]]);
      setColumns(columnsCopy);
    }

    foundationsCopy[destinationFoundationNum].push(foundCardAndOrigin[1]);
    setFoundations({ ...foundationsCopy });
  }

  function handleRestartClick() {
     setDealt(!dealt)
     setDeck([])
     setWastePile([])
     setStockPile([])
     setFoundations({1: [], 2: [], 3: [], 4: []})
     setColumns({})
     handleNewGameClick()
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <PlayingBoard>
        <TopRow
          stockPile={stockPile}
          wastePile={wastePile}
          handleStockClick={handleStockClick}
          foundations={foundations}
          score={score}
        />
        {loadingNewGame && <Slab color="grey" size="medium" text="Dealing..."/>}
        <Tableau
          columns={columns}
          handleTableauColClick={handleTableauColClick}
          currentlyDraggedCards={currentlyDraggedCards}
        />
        <ControlModule handleNewGameClick={handleNewGameClick} dealt={dealt} handleRestartClick={handleRestartClick} loadingNewGame={loadingNewGame} />
      </PlayingBoard>
    </DndContext>
  );
}

export default App;
