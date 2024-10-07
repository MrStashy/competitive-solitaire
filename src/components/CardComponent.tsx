import { PlayingCard } from "../utils/types";
import { useDraggable } from "@dnd-kit/core";

type CardProps = {
  card: PlayingCard;
  tableau: boolean;
  index: number;
  columnNo: number;
};

export default function Card({ card, tableau, index, columnNo }: CardProps) {
  const dragId = `${card.code}-${columnNo ?? 0}`;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dragId,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    top: `${index * 20}px`,
    zIndex: isDragging ? 1000 : "auto",
  };

  if (isDragging && card.draggableGroup.length) {
    const cardsToRender = [card, ...card.draggableGroup];

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative"
        {...listeners}
        {...attributes}
      >
        {cardsToRender.map((card, index) => {
          return (
            <img 
            key={card.code}
            className={`absolute left-0`}
            style={{ top: `${index * 20}px` }}
            src={card.images.png}
            alt={`Card ${card.code}`}
            />
          )
        })}
      </div>
    );
  }

  if (tableau) {
    return (
      <img
        ref={setNodeRef}
        className={`absolute top-${index * 10} left-0`}
        style={style}
        {...listeners}
        {...attributes}
        src={card.images.png}
        alt={`Card ${card.code}`}
      />
    );
  }
}
