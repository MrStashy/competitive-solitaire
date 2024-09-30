import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
};

export default function Stock({ stockPile }: StockProps) {
  if (stockPile.length) {
    return <img src={stockPile[0].images.png} className="h-card-height" />;
  }

  return <p className="border h-card-height w-card-width">Stockpile</p>;
}
