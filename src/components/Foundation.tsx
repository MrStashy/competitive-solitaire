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
            <div ref={setNodeRef} className="w-[100px]">
            <Card card={foundationCards[foundationCards.length - 1]} cards={null} tableau={false} index={0} columnNo={null} wastePile={null} handleTableauColClick={null} currentlyDraggedCards={[]} foundation={true}/>
            </div>
        )
    }

    return (
            <p className="border w-[100px]" ref={setNodeRef}></p>      
    )
}