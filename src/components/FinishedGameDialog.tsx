import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

type FinishedGameDialogProps = {
    gameFinished: boolean
    time: number
    score: number
    handleRestartClick: () => void
    handleLeaderboardClick: () => void
}

export default function FinishedGameDialog({gameFinished, time, score, handleRestartClick, handleLeaderboardClick}: FinishedGameDialogProps) {
  return (
    <Dialog open={gameFinished} onClose={() => {}}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 bg-white/80 p-12 rounded-md border-black border-2 flex-col flex no-margin gap-4 place-items-center">
          <DialogTitle className="font-bold">Game Over</DialogTitle>
          <p>{`Your final score was ${score}.`}</p>
          <p>{`Your time was ${time} seconds.`}</p>
          <div className="flex flex-row gap-2">
          <button className="bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none" onClick={handleRestartClick}>New Game</button>
          <button className="bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none">Submit Score</button>
          <button className="bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none" onClick={() => handleLeaderboardClick()}>Leaderboard</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
