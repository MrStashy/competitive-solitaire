import { PlayingCard } from "../utils/types";
import { useDraggable } from "@dnd-kit/core";

type CardProps = {
  card: PlayingCard;
  tableau: boolean;
  index: number;
};

export default function Card({ card, tableau, index }: CardProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: card.code,
      });
    
      const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        top: `${index * 20}px`
      };

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
