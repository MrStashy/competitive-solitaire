import { PileOfCards } from "../utils/types"
import CardComponent from "./CardComponent"

type WastePileProps = {
    wastePile: PileOfCards
}

export default function WastePile({wastePile}: WastePileProps) {
    let style = "relative w-[100px]"

    if (!wastePile.length) {
        style += " border"
    }  

    const cardsToDisplay = wastePile.slice(wastePile.length - 3)

    if (cardsToDisplay) {
        return (
            <div className={style}>
                    {cardsToDisplay.map((card, index) => {

                        if (index === cardsToDisplay.length - 1) {
                            card.draggable = true
                        }
                        return (
                            <CardComponent card={card} wastePile={true} key={card.code} index={index} cards={null} columnNo={null} handleTableauColClick={null} tableau={false} currentlyDraggedCards={[]}/>
                        )
                    })}
            </div>
        )
    }


      return (
        <div className={style}>
        </div>
      )
}