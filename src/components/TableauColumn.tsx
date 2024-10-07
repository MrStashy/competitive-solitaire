import { PileOfCards } from "../utils/types"
import CardComponent from "./CardComponent"
import { useDroppable } from "@dnd-kit/core"
import rankMap from "../utils/cardRankMap"


type TableauColumnProps = {
    cards: PileOfCards
    columnNo: number
}

export default function TableauColumn({cards, columnNo}: TableauColumnProps) {

    const {setNodeRef} = useDroppable({
        id: columnNo
    })

    if(cards.length > 0) {
        for (let i = cards.length - 1; i >= 0; i--) {
            if (i === cards.length - 1) {
                cards[i].groupSize = 1
                continue
            }

            const currentCard = cards[i]
            const subsequentCard = cards[i + 1]
    
            const currentCardIsBlack = currentCard.code[1] === 'S' || currentCard.code[1] === 'C' ? true : false
            const subsequentCardIsBlack = subsequentCard.code[1] === 'S' || subsequentCard.code[1] === 'C' ? true : false

            const currentCardRank = rankMap[currentCard.code[0]]
            const subsequentCardRank = rankMap[subsequentCard.code[0]]

            if (currentCardIsBlack !== subsequentCardIsBlack && currentCardRank - subsequentCardRank === 1) {
                currentCard.groupSize = subsequentCard.groupSize + 1
            } else {
                currentCard.groupSize = 1
            }
        }
    }


    return(
        <div className="flex flex-col relative h-[400px] w-[100px]"
        ref={setNodeRef}>
            {cards.map((card, index) => {


                return  (<CardComponent card={card} tableau={true} key={card.code} index={index} columnNo={columnNo}/>) 
            })}
        </div>
    )
}

// 10S, 9H, 8C