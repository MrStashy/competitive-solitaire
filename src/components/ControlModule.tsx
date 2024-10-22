type ControlModuleProps = {
  handleNewGameClick: () => void;
  handleRestartClick: () => void;
  dealt: boolean;
  loadingNewGame: boolean;
  endGame: () => void;
};

export default function ControlModule({
  handleNewGameClick,
  handleRestartClick,
  dealt,
  loadingNewGame,
  endGame,
}: ControlModuleProps) {
  const style =
    "text-2xl mb-10 bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none";

  if (dealt) {
    return (
      <div className="flex flex-col place-items-center">
        <div className="flex flex-row gap-4">
          <button className={style} onClick={handleRestartClick}>
            Restart
          </button>
          <button className={style} onClick={() => endGame()}>
            Give Up
          </button>
        </div>
      </div>
    );
  }

  if (!loadingNewGame)
    return (
      <div className="flex flex-col place-items-center">
        <div className="flex flex-row gap-4">
          <button onClick={handleNewGameClick} className={style}>
            New Game
          </button>
          <button className={style}>Leaderboard</button>
        </div>
      </div>
    );
}
