import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export default function Stock({ stockPile, handleStockClick }: StockProps) {
  const style = stockPile.length ? "relative w-[100px]" : "border-2 w-[100px] rounded-md";

  if (stockPile.length) {
    return (
      <img
        src={"/img/1B.svg"}
        className={style}
        onClick={handleStockClick}
      />
    );
  }

  return <div className={style} onClick={handleStockClick}></div>;
}
