import { PileOfCards, PlayingCard, UserScore } from "./types"
const apiUrl: string = import.meta.env.VITE_API_URL

type NewGameResponseTypes = {
    deck_id: string
}

type GetNewStockPileResponseTypes = {
    cards: PlayingCard[]
}

async function getNewFullDeck(deckId: string): Promise<PileOfCards> {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)

    if (!response.ok) {
        throw new Error("Error getting stock pile")
    }

    const data: GetNewStockPileResponseTypes = await response.json()
    const { cards } = data
    return  cards
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

async function getTop10Scores(): Promise<UserScore[]> {
    const url = apiUrl + '/scores'
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Error getting new deck")
    }

    const data = await response.json()
    return data
}



export { getNewDeck, getNewFullDeck, getTop10Scores }