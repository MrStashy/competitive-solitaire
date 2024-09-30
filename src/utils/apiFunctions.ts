import { PileOfCards, PlayingCard } from "./types"

type NewGameResponseTypes = {
    deck_id: string
}

type GetNewStockPileResponseTypes = {
    cards: PlayingCard[]
}



async function getNewDeck(): Promise<string> {
    const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")

    if (!response.ok) {
        throw new Error("Error getting new deck")
    }

    const data: NewGameResponseTypes = await response.json()
    const { deck_id } = data
    return deck_id
}

async function getNewStockPile(deckId: string): Promise<PileOfCards> {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=24`)

    if (!response.ok) {
        throw new Error("Error getting stock pile")
    }

    const data: GetNewStockPileResponseTypes = await response.json()
    const { cards } = data
    return  cards
}

export { getNewDeck, getNewStockPile }