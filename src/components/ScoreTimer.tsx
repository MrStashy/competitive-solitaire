import { useEffect, useState } from "react";

type ScoreTimerProps = {
    score: number
    gameFinished: boolean
}

export default function ScoreTimer({ score, gameFinished }: ScoreTimerProps) {
    const [timer, setTimer] = useState(0)


  useEffect(() => {
    const intervalId = setInterval(() => {

      if (!gameFinished) {
        setTimer(prev => prev += 1)
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [gameFinished])

    return (
        <div className="bg-slate-500/50 lg:h-auto p-2 rounded-md place-items-center flex flex-col w-[50px] h-[90px] lg:w-[80px] animate-gradient bg-[length:200%_200%] text-white border-2 text-xs lg:text-base">
      <p>Score</p>
      <p className="text-yellow-300">{score}</p>
      <p>Time</p>
      <p className="text-yellow-300">{timer}</p>
      </div>
    )
}