import Stock from "./Stock";
import WastePile from "./WastePile";
import Foundation from "./Foundation";

export default function TopRow() {
  return (
    <header className="flex flex-row justify-between p-2">
      <div className="flex flex-row gap-2">
        <Stock />
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
