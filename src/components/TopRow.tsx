import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { Foundations, PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards
  wastePile: PileOfCards
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void
  foundations: Foundations
}

export default function TopRow({ stockPile, wastePile, handleStockClick, foundations }: TopRowProps) {
  const foundationsKeys = Object.keys(foundations)

  return (
    <header className="flex flex-row justify-between p-2 min-h-40">
      <div className="flex flex-row gap-2">
        <Stock stockPile={stockPile} handleStockClick={handleStockClick}/>
        <WastePile wastePile={wastePile} />
      </div>
      <div className="flex flex-row gap-2">
        {foundationsKeys.map((foundationNum) => {
          return (
              <Foundation foundationCards={foundations[Number(foundationNum)]} key={foundationNum} foundationNum={Number(foundationNum)}/>
          )
        })}
      </div>
    </header>
  );
}
