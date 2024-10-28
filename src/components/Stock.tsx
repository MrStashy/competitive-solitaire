import { PileOfCards } from "../utils/types";

type StockProps = {
  stockPile: PileOfCards;
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void;
};

export default function Stock({ stockPile, handleStockClick }: StockProps) {
  const style = stockPile.length ? "relative lg:h-[140px] h-[90px]" : "border-2 rounded-md lg:h-[140px] lg:w-[100px] h-[90px] w-[60px]";

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
