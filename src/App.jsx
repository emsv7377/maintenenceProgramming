import { useState } from 'react'
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartScreen/>} />
          <Route path='/GameBoard' element={<GameBoard width={30} height={30}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
