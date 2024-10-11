import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export default function Stock({ stockPile, handleStockClick }: StockProps) {
  const style = stockPile.length ? "relative w-[100px] max-h-[140px]" : "border-2 rounded-md w-[100px] max-h-[140px]";

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
