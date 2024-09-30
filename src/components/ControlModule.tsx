type ControlModuleProps = {
    handleNewGameClick: () => void
}

export default function ControlModule({ handleNewGameClick }: ControlModuleProps) {

    return (
        <div className="flex flex-col place-items-center">
       <button onClick={handleNewGameClick}>New Game</button>
       </div>
    )
}