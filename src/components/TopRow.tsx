import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { Foundations, PileOfCards } from "../utils/types";
import { useEffect, useState } from "react";

type TopRowProps = {
  stockPile: PileOfCards
  wastePile: PileOfCards
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void
  foundations: Foundations
  score: number
  dealt: boolean
  gameFinished: boolean
}

export default function TopRow({ stockPile, wastePile, handleStockClick, foundations, score, dealt, gameFinished }: TopRowProps) {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {

      if (!gameFinished) {
        setTimer(prev => prev += 1)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameFinished])


  const foundationsKeys = Object.keys(foundations)
  return (
    <header className="flex flex-row justify-between p-2 place-items-center min-h-40">
      <div className="flex flex-row gap-2 h-[140px]">
        <Stock stockPile={stockPile} handleStockClick={handleStockClick}/>
        <WastePile wastePile={wastePile} />
      </div>
      {dealt && <div className="bg-slate-500/50 h-auto p-4 rounded-md place-items-center flex flex-col w-[80px] animate-gradient bg-[length:200%_200%] text-white border-2">
      <p>Score</p>
      <p className="text-yellow-300">{score}</p>
      <p>Time</p>
      <p className="text-yellow-300">{timer}</p>
      </div>}
   
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


