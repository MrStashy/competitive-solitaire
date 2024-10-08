import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards
  wastePile: PileOfCards
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void
}

export default function TopRow({ stockPile, wastePile, handleStockClick }: TopRowProps) {
  return (
    <header className="flex flex-row justify-between p-2 min-h-40">
      <div className="flex flex-row gap-2">
        <Stock stockPile={stockPile} handleStockClick={handleStockClick}/>
        <WastePile wastePile={wastePile} />
      </div>
      <div className="flex flex-row gap-2">
        <Foundation />
        <Foundation />
        <Foundation />
        <Foundation />
      </div>
    </header>
  );
}
