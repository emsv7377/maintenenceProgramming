import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'

//<GameBoard width={30} height={30}/>

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      
      <h1>Rat-Man</h1>
      <StartScreen></StartScreen>
    </div>
  )
}

export default App
