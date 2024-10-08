import { PileOfCards } from "./types"

export default function markRevealedCards(column: PileOfCards) {
    const newArr = column.map((card, index) => {
        if (index === column.length - 1) {
            card.revealed = true
        } else {
            card.revealed = false
        }
    })

    return newArr
}