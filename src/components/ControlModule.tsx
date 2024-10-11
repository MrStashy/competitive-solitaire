type ControlModuleProps = {
    handleNewGameClick: () => void
    handleRestartClick: () => void
    dealt: boolean
    loadingNewGame: boolean
}

export default function ControlModule({ handleNewGameClick, handleRestartClick, dealt, loadingNewGame }: ControlModuleProps) {

    const style = "text-2xl mb-10 bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none"

    if (dealt || loadingNewGame) {
        return (
            <div className="flex flex-col place-items-center">
            <button className={style} onClick={handleRestartClick}>Restart</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col place-items-center">
       <button onClick={handleNewGameClick} className={style}>New Game</button>
       </div>
    )
}