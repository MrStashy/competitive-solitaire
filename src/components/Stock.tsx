import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void
};

export default function Stock({ stockPile, handleStockClick }: StockProps) {

  const style = stockPile.length ? "max-h-40 w-[100px]" : "border w-[100px]"

  if (stockPile.length) {
    return <img src={'https://www.deckofcardsapi.com/static/img/back.png'} className={style} onClick={handleStockClick}/>;
  }

  return (
    <div className={style}>
    </div>
  )
}
