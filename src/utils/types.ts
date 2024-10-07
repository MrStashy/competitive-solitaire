export type PlayingCard = {
    code: string
    image: string
    images: {
        svg: string
        png: string
    }
    value: string
    suit: string
    groupSize: number
}

export type PileOfCards = PlayingCard[]

export type TableauColumns = {
 [key: number]: PileOfCards
}
