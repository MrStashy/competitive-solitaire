import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
};

export default function Stock({ stockPile }: StockProps) {
  if (stockPile.length) {
    return <img src={stockPile[0].images.png} className="" />;
  }

  return <p className="border">Stockpile</p>;
}
