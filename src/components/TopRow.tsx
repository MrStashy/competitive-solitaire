import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards
  wastePile: PileOfCards
}

export default function TopRow({ stockPile, wastePile }: TopRowProps) {
  return (
    <header className="flex flex-row justify-between p-2 min-h-40">
      <div className="flex flex-row gap-2">
        <Stock stockPile={stockPile} />
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
