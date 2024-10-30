import { UserScore } from "./types"
const apiUrl: string = import.meta.env.VITE_API_URL


async function getTop10Scores(): Promise<UserScore[]> {
    const url = apiUrl + '/scores'
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error("Error getting new deck")
    }

    const data = await response.json()
    return data
}

async function postUserAndScore(userScore: UserScore) {
    const url = apiUrl + '/usernames'

    try {
        await fetch(url, {
            method: "POST",
            body: JSON.stringify(userScore),
            headers: {
                "Content-Type": "application/json",
              }
        })
    } catch (e) {
        console.error(e)
    }
}



export { getTop10Scores, postUserAndScore }