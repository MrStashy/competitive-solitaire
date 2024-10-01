import { PileOfCards } from "../utils/types"
import CardComponent from "./CardComponent"


type TableauColumnProps = {
    cards: PileOfCards
}

export default function TableauColumn({cards}: TableauColumnProps) {

    return(
        <div className="flex flex-col relative h-[400px] w-[100px]">
            {cards.map((card, index) => {
                return  (<CardComponent card={card} tableau={true} key={card.code} index={index}/>) 
            })}
        </div>
    )
}