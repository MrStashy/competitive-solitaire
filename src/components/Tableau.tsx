import { PileOfCards, TableauColumns } from "../utils/types";
import TableauColumn from "./TableauColumn";

type TableauProps = {
  columns: TableauColumns;
  handleTableauColClick: (e: React.MouseEvent<HTMLImageElement>) => void
  currentlyDraggedCards: PileOfCards
};

export default function Tableau({ columns, handleTableauColClick, currentlyDraggedCards }: TableauProps) {
  return (
    <div className="flex flex-row justify-around p-2 gap-2 mx-10">
      {Object.keys(columns).map((columnNo) => {
                const columnIndex = Number(columnNo) as keyof TableauColumns;

        return (
            <TableauColumn key={columnNo} columnNo={Number(columnNo)} cards={columns[columnIndex]} handleTableauColClick={handleTableauColClick}
            currentlyDraggedCards={currentlyDraggedCards}/>
        );
      })}
    </div>
  );
}
