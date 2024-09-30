import './App.css'
import PlayingBoard from './components/PlayingBoard'
import TopRow from './components/TopRow'
import Tableau from './components/Tableau'
import ControlModule from './components/ControlModule'
import { getNewDeck, getNewStockPile } from './utils/apiFunctions'
import { useState } from 'react'
import { PileOfCards } from './utils/types'

function App() {
  const [deckId, setDeckId] = useState<string>("")
  const [stockPile, setStockPile ] = useState<PileOfCards>([])
  const [dealt, setDealt] = useState<boolean>(false)

  async function handleNewGameClick() {
      const newDeckId = await getNewDeck()
      setDeckId(newDeckId)
  }

  async function dealCards() {
    const newStockPile = await getNewStockPile(deckId)
    setStockPile(newStockPile)
    setDealt(true)
  }

  if (deckId && !dealt) {
    dealCards()
  }

  return (
   <PlayingBoard>
    <TopRow stockPile={stockPile} />
    <Tableau />
    <ControlModule handleNewGameClick={handleNewGameClick}/>
   </PlayingBoard>
  )
}

export default App
