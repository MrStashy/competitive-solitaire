import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import { useState } from 'react'
import { postUserAndScore } from '../utils/apiFunctions'
import { Dispatch, SetStateAction } from 'react'

type FinishedGameDialogProps = {
    gameFinished: boolean
    time: number
    score: number
    victory: boolean
    handleRestartClick: () => void
    handleLeaderboardClick: () => void
}

export default function FinishedGameDialog({gameFinished, time, score, handleRestartClick, handleLeaderboardClick, victory}: FinishedGameDialogProps) {
  const [showSubmitInput, setShowSubmitInput] = useState<boolean>(false)

  const buttonStyle="bg-gradient-to-tr from-red-800 to-rose-500 border-2 p-4 rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none"


  function getFinalScore() {
    let finalScore: number = (600 - time) * (score * 10)
    if (victory) {
      finalScore *= 10
    }
    finalScore /= 1000
    return Math.floor(finalScore)
  }



  return (
    <Dialog open={gameFinished} onClose={() => {}}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 bg-white/80 p-12 rounded-md border-black border-2 flex-col flex no-margin gap-4 place-items-center">
          <DialogTitle className="font-bold">Game Over</DialogTitle>
          <p>{`Your score was ${score}.`}</p>
          <p>{`Your time was ${time} seconds.`}</p>
          <p className="font-bold">Your final score is {`${getFinalScore()}`}</p>
          <div className="flex flex-row gap-2">
          <button className={buttonStyle} onClick={handleRestartClick}>New Game</button>
          <button className={buttonStyle} onClick={() => setShowSubmitInput(!showSubmitInput)}>{showSubmitInput ? "Cancel Submit" : "Submit Score"}</button>
          <button className={buttonStyle} onClick={() => handleLeaderboardClick()}>Leaderboard</button>
          </div>
          {showSubmitInput ? <SubmitScoreInput getFinalScore={getFinalScore} setShowSubmitInput={setShowSubmitInput}/>: null}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

type SubmitScoreInputProps = {
  getFinalScore: () => number
  setShowSubmitInput: Dispatch<SetStateAction<boolean>>
}

function SubmitScoreInput({getFinalScore, setShowSubmitInput}: SubmitScoreInputProps) {
  const [username, setUsername] = useState<string>('')

  async function handleSubmitScore() {
    const userScore = {
      username: username,
      finalScore: getFinalScore()
    }

    if (userScore.finalScore > 0) {
      await postUserAndScore(userScore)
    }

   setShowSubmitInput(false)
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setUsername(value)
  }

  return (
    <div className="flex flex-row gap-2">
    <input placeholder="Your name" className="rounded border-2 border-black px-2" onChange={handleChange} value={username} />
    <button onClick={handleSubmitScore} className="bg-gradient-to-tr from-red-800 to-rose-500 border-2 px-4 text-xs rounded-lg text-white border-white shadow-md shadow-red-500/50 hover:shadow-none">Submit</button>
    </div>
  )
}

