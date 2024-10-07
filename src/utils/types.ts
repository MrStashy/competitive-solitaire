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
    draggableGroup: PileOfCards
}

export type PileOfCards = PlayingCard[]

export type TableauColumns = {
 [key: number]: PileOfCards
}
