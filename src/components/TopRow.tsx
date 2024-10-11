import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { Foundations, PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards
  wastePile: PileOfCards
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void
  foundations: Foundations
  score: number
}

export default function TopRow({ stockPile, wastePile, handleStockClick, foundations, score }: TopRowProps) {
  const foundationsKeys = Object.keys(foundations)
  return (
    <header className="flex flex-row justify-between p-2 place-items-center">
      <div className="flex flex-row gap-2 min-h-40">
        <Stock stockPile={stockPile} handleStockClick={handleStockClick}/>
        <WastePile wastePile={wastePile} />
      </div>
      <div className="bg-white h-[100px] flex flex-col p-4 place-items-center rounded-md">
      <p>Score</p>
      <p>{score}</p>
      </div>
      <div className="flex flex-row gap-2 h-[140px]">
        {foundationsKeys.map((foundationNum) => {
          return (
              <Foundation foundationCards={foundations[Number(foundationNum)]} key={foundationNum} foundationNum={Number(foundationNum)}/>
          )
        })}
      </div>
    </header>
  );
}
