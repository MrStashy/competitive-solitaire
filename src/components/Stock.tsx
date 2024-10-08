import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
};

export default function Stock({ stockPile }: StockProps) {
  if (stockPile.length) {
    return <img src={'https://www.deckofcardsapi.com/static/img/back.png'} className="" />;
  }

  return <p className="border">Stockpile</p>;
}
