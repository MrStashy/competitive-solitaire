export type PlayingCard = {
    code: string
    image: string
    images: {
        svg: string
        png: string
    }
    value: string
    suit: string
}

export type PileOfCards = PlayingCard[]

export type TableauColumns = {
    1: PileOfCards
    2: PileOfCards
    3: PileOfCards
    4: PileOfCards
    5: PileOfCards
    6: PileOfCards
    7: PileOfCards
}
