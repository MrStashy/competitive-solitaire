import { PileOfCards } from "../utils/types"
import Card from "./CardComponent"
import { useDroppable } from "@dnd-kit/core";

type FoundationProps = {
    foundationCards: PileOfCards
    foundationNum: number
}

export default function Foundation({ foundationCards, foundationNum }: FoundationProps) {
    const { setNodeRef } = useDroppable({
        id: 'F' + foundationNum.toString()
      });

    if (foundationCards.length) {
        return (
            <div ref={setNodeRef} className="lg:w-[100px] w-[60px]">
            <Card card={foundationCards[foundationCards.length - 1]} cards={null} tableau={false} index={0} columnNo={null} wastePile={null} handleTableauColClick={null} currentlyDraggedCards={[]} foundation={true}/>
            </div>
        )
    }

    return (
            <p className="lg:w-[100px] w-[60px] lg:h-[140px] rounded-md border-2" ref={setNodeRef}></p>      
    )
}