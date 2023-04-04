import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './GameBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Rat-Man</h1>
      <GameBoard width={13} height={11}/>
    </div>
  )
}

export default App
