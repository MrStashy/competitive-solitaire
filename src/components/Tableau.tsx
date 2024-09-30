import TableauColumn from "./TableauColumn"

export default function Tableau () {
    return (
        <div className="flex flex-row justify-around p-2 gap-2 mx-10">
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        <TableauColumn />
        </div>
    )
}