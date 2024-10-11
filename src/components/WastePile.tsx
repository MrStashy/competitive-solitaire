import { PileOfCards } from "../utils/types";
import CardComponent from "./CardComponent";

type WastePileProps = {
  wastePile: PileOfCards;
};

export default function WastePile({ wastePile }: WastePileProps) {
  let style = "relative w-[100px]";
  let cardsToDisplay;

  if (!wastePile.length) {
    style += " border";
  }

  
  if (wastePile.length <= 3) {
    cardsToDisplay = wastePile;
  } else {
    cardsToDisplay = wastePile.slice(wastePile.length - 3);
  }


  if (cardsToDisplay) {
    return (
      <div className={style}>
        {cardsToDisplay.map((card, index) => {
          if (index === cardsToDisplay.length - 1) {
            card.draggable = true;
          } else {
            card.draggable = false;
          }
          return (
            <CardComponent
              card={card}
              wastePile={true}
              key={card.code}
              index={index}
              cards={null}
              columnNo={null}
              handleTableauColClick={null}
              tableau={false}
              currentlyDraggedCards={[]}
              foundation={false}
            />
          );
        })}
      </div>
    );
  }

  return <div className={style}></div>;
}
