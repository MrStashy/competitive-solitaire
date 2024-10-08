import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
};

export default function Stock({ stockPile }: StockProps) {
  const style = stockPile.length ? "w-[100px]" : "border w-[100px]"

  if (stockPile.length) {
    return <img src={'https://www.deckofcardsapi.com/static/img/back.png'} className={style} />;
  }

  return (
    <div className={style}>
    </div>
  )
}
