import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'
import Settings from './screens/Settings'
import Tutorial from './screens/Tutorial'
import Game from './screens/Game'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartScreen/>} />
            <Route path='/GameBoard' element={<GameBoard width={10} height={13} />}/>
            <Route path='Settings' element={<Settings/>}/>
            <Route path='Tutorial' element={<Tutorial/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
