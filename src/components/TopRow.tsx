import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import ScoreTimer from "./ScoreTimer";
import { Foundations, PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards;
  wastePile: PileOfCards;
  handleStockClick: (e: React.MouseEvent<HTMLImageElement>) => void;
  foundations: Foundations;
  score: number;
  dealt: boolean;
  gameFinished: boolean;
};

export default function TopRow({
  stockPile,
  wastePile,
  handleStockClick,
  foundations,
  score,
  dealt,
  gameFinished,
}: TopRowProps) {


  const foundationsKeys = Object.keys(foundations);
  return (
    <header className="flex flex-row justify-between p-2 place-items-center lg:h-[150px] h-[100px]">
      <div className="flex flex-row gap-2">
        <Stock stockPile={stockPile} handleStockClick={handleStockClick} />
        <WastePile wastePile={wastePile} />
      </div>
      {dealt && <ScoreTimer gameFinished={gameFinished} score={score} />}

      <div className="flex flex-row gap-2">
        {foundationsKeys.map((foundationNum) => {
          return (
            <Foundation
              foundationCards={foundations[Number(foundationNum)]}
              key={foundationNum}
              foundationNum={Number(foundationNum)}
            />
          );
        })}
      </div>
    </header>
  );
}
