import { PileOfCards } from "../utils/types"
import Card from "./CardComponent"

type FoundationProps = {
    foundationCards: PileOfCards
}

export default function Foundation({ foundationCards }: FoundationProps) {
    
    if (foundationCards.length) {
        return (
            <Card card={foundationCards[0]} cards={null} tableau={false} index={0} columnNo={null} wastePile={null} handleTableauColClick={null} currentlyDraggedCards={[]} />
        )
    }

    return (
            <p className="border">Foundation</p>      
    )
}