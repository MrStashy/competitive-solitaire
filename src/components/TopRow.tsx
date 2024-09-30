import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";
import { PileOfCards } from "../utils/types";

type TopRowProps = {
  stockPile: PileOfCards
}

export default function TopRow({ stockPile }: TopRowProps) {
  return (
    <header className="flex flex-row justify-between p-2">
      <div className="flex flex-row gap-2">
        <Stock stockPile={stockPile} />
        <WastePile />
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
