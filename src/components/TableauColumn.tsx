import { PileOfCards } from "../utils/types";
import CardComponent from "./CardComponent";
import { useDroppable } from "@dnd-kit/core";

type TableauColumnProps = {
  cards: PileOfCards;
  columnNo: number;
  handleTableauColClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  currentlyDraggedCards: PileOfCards;
};

export default function TableauColumn({
  cards,
  columnNo,
  handleTableauColClick,
  currentlyDraggedCards,
}: TableauColumnProps) {
  const { setNodeRef } = useDroppable({
    id: columnNo,
  });

  if (!cards.length) {
    return (
      <div
        ref={setNodeRef}
        className="border-2 rounded-md h-36 w-[100px]"
      ></div>
    );
  }

  return (
    <div
      className="flex flex-col relative w-[65px] lg:w-[100px]"
      ref={setNodeRef}
    >
      {cards.map((card, index) => {
        return (
          <CardComponent
            cards={cards}
            card={card}
            tableau={true}
            key={card.code}
            index={index}
            columnNo={columnNo}
            handleTableauColClick={handleTableauColClick}
            wastePile={null}
            currentlyDraggedCards={currentlyDraggedCards}
            foundation={false}
          />
        );
      })}
    </div>
  );
}
