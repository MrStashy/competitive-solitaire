import { PileOfCards } from "../utils/types"


type TableauColumnProps = {
    cards: PileOfCards
}

export default function TableauColumn({cards}: TableauColumnProps) {

    return(
        <div className="flex flex-col relative h-[400px] w-[100px]">
            {cards.map((card, index) => {
                return    <img 
                key={card.code} 
                className="absolute top-${index * 10} left-0"
                style={{ top: `${index * 20}px` }}
                src={card.images.png} 
                alt={`Card ${card.code}`} 
            />
            })}
        </div>
    )
}