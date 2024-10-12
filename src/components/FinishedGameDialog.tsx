import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

type FinishedGameDialogProps = {
    gameFinished: boolean
    time: number
    score: number
}

export default function FinishedGameDialog({gameFinished, time, score}: FinishedGameDialogProps) {
  return (
    <Dialog open={gameFinished} onClose={() => {}}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white/70 p-12">
          <DialogTitle className="font-bold">Game Over</DialogTitle>
          <p>{`Your final score was ${score}.`}</p>
          <p>{`Your time was ${time} seconds.`}</p>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
