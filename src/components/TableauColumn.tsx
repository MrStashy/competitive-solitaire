import { PileOfCards } from "../utils/types"


type TableauColumnProps = {
    cards: PileOfCards
}

export default function TableauColumn({cards}: TableauColumnProps) {

    return(
        <p className="border h-card-height w-card-width">Column</p>
    )
}