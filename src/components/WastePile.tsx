import { PileOfCards } from "../utils/types"

type WastePileProps = {
    wastePile: PileOfCards
}

export default function WastePile({wastePile}: WastePileProps) {
    const style = wastePile.length ? "w-[100px]" : "border w-[100px]"

    if (wastePile.length) {
        return <img src={'https://www.deckofcardsapi.com/static/img/back.png'} className={style} />;
      }
    

      return (
        <div className={style}>
        </div>
      )
}