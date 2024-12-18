import { PileOfCards, PlayingCard } from "../utils/types";
import { useDraggable } from "@dnd-kit/core";

type CardProps = {
  card: PlayingCard;
  cards: PileOfCards | null;
  tableau: boolean;
  index: number;
  columnNo: number | null;
  wastePile: boolean | null;
  handleTableauColClick:
    | ((e: React.MouseEvent<HTMLImageElement>) => void)
    | null;
  currentlyDraggedCards: PileOfCards;
  foundation: boolean
};

export default function Card({
  card,
  tableau,
  index,
  columnNo,
  handleTableauColClick,
  wastePile,
  currentlyDraggedCards, 
  foundation
}: CardProps) {
  const dragId = `${card.code}-${columnNo ?? 0}`;


  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dragId,
      disabled: !card.revealed,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    top: `${index * 20}px`,
    zIndex: isDragging ? 1000 : "auto",
  };

  const wastePileStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    left: `${index * 20}px`,
    zIndex: isDragging ? 1000 : "auto",
  };

  const imgSrc = card.revealed
    ? `/img/${card.code}.svg`
    : "/img/1B.svg";

  if (currentlyDraggedCards?.includes(card) && currentlyDraggedCards[0] !==  card) {
    return
  }

  if (isDragging && card.draggableGroup?.length) {
    const draggedCardsToRender = [card, ...card.draggableGroup];
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative min-h-[5px]"
        {...listeners}
        {...attributes}
      >
        {draggedCardsToRender.map((card, index) => {
          return (
            <img
              key={card.code}
              className={`absolute`}
              style={{ top: `${index * 20}px` }}
              src={ `/img/${card.code}.svg`}
              alt={`Card ${card.code}`}
              draggable={false}
            />
          );
        })}
      </div>
    );
  }

  if (tableau && typeof handleTableauColClick === "function") {
    return (
      <img
        ref={setNodeRef}
        className={`absolute top-${index * 10} left-0`}
        style={style}
        {...listeners}
        {...attributes}
        src={imgSrc}
        alt={`Card ${card.code}`}
        onClick={handleTableauColClick}
        id={`${card.code}-${columnNo}`}
        draggable={false}
      />
    );
  }

  if (wastePile) {
    return (
      <img
        style={wastePileStyle}
        ref={card.draggable ? setNodeRef : null}
        {...(card.draggable ? listeners : {})}
        {...(card.draggable ? attributes : {})}
        src={imgSrc}
        alt={`Card ${card.code}`}
        id={`${card.code}-${columnNo}`}
        className={`absolute`}
        draggable={false}
      />
    );
  }

  if (foundation) {
    return (
      <img
        src={imgSrc}
        alt={`Card ${card.code}`}
        draggable={false}
      />
    );
  }

}
