import { PileOfCards } from "./types";
import rankMap from "./cardRankMap";

export default function markColumnGroups(column: PileOfCards) {
  if (column.length < 1) {
    return column;
  }

  const newArr = [... column]
  for (let i = newArr.length - 1; i >= 0; i--) {
    const currentCard = newArr[i];
    const subsequentCard = newArr[i + 1];
    currentCard.draggableGroup = [];

    if (i === newArr.length - 1) {
      currentCard.draggableGroup = [];
      continue;
    }

    const currentCardIsBlack =
      currentCard.code[1] === "S" || currentCard.code[1] === "C";
    const subsequentCardIsBlack =
      subsequentCard.code[1] === "S" || subsequentCard.code[1] === "C";

    const currentCardRank = rankMap[currentCard.code[0]];
    const subsequentCardRank = rankMap[subsequentCard.code[0]];

    if (
      currentCardIsBlack !== subsequentCardIsBlack &&
      currentCardRank - subsequentCardRank === 1
    ) {
      const draggableGroup = [subsequentCard, ...subsequentCard.draggableGroup];
      currentCard.draggableGroup = draggableGroup;
    }
  }
  return newArr
}
