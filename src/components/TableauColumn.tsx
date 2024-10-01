import { PileOfCards } from "../utils/types"
import CardComponent from "./CardComponent"
import { useDroppable } from "@dnd-kit/core"


type TableauColumnProps = {
    cards: PileOfCards
    columnNo: number
}

export default function TableauColumn({cards, columnNo}: TableauColumnProps) {

    const {setNodeRef} = useDroppable({
        id: columnNo
    })

    return(
        <div className="flex flex-col relative h-[400px] w-[100px]"
        ref={setNodeRef}>
            {cards.map((card, index) => {
                return  (<CardComponent card={card} tableau={true} key={card.code} index={index} columnNo={columnNo}/>) 
            })}
        </div>
    )
}