import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'

type FinishedGameDialogProps = {
    gameFinished: boolean
}

export default function FinishedGameDialog({gameFinished}: FinishedGameDialogProps) {
  return (
    <Dialog open={gameFinished} onClose={() => {}}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white/50 p-12">
          <DialogTitle className="font-bold">Game Over</DialogTitle>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
