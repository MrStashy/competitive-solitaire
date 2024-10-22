export type PlayingCard = {
    code: string
    image: string
    images: {
        svg: string
        png: string
    }
    value: string
    suit: string
    draggableGroup: PileOfCards
    revealed: boolean
    draggable: boolean
}

export type PileOfCards = PlayingCard[]

export type TableauColumns = {
 [key: number]: PileOfCards
}

export type Foundations = {
    [key: number]: PileOfCards
   }

export type UserScore = {
    username: string
    score: number
}