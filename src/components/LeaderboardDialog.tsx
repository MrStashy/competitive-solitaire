import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { UserScore } from '../utils/types'
import ScoreLi from './ScoreLi'

type LeaderboardDialogProps = {
    leaderboardShow: boolean
    setLeaderboardShow: Dispatch<SetStateAction<boolean>>
    scores: UserScore[]
}

export default function LeaderboardDialog ({leaderboardShow, setLeaderboardShow, scores}: LeaderboardDialogProps) {

    return (
        <Dialog open={leaderboardShow} onClose={() => setLeaderboardShow(false)}>
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
  
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white/80 p-12 rounded-md border-black border-2 flex-col flex no-margin gap-4 place-items-center">
            <DialogTitle className="font-bold">Leaderboard</DialogTitle>
            <ul>
                {scores?.map((score, index) => {
                    return <ScoreLi key={`${score.username}-${score.score}`} score={score} index={index} />
                })}
            </ul>
          </DialogPanel>
        </div>
      </Dialog>
    )
}