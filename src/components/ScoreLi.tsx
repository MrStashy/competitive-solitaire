import { UserScore } from "../utils/types"

type ScoreProps = {
    score: UserScore
    index: number
}

export default function ScoreLi ({score, index}: ScoreProps) {

    return (
        <li className="flex flex-row justify-between w-56">
            <div className="flex flex-row gap-4">
           <p>{index+1}.</p>
           <p>{score.username}</p> 
           </div>
           <p>{score.finalScore}</p>
        </li>
    )
}