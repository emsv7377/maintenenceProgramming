import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'
import Settings from './screens/Settings'
import Tutorial from './screens/Tutorial'
import Game from './screens/Game'

import { ENG, SVE } from './components/Language'
import LanguageContext from './components/LanguageContext';

import sweflag from './assets/sweflag.png'
import ukflag from './assets/ukflag.png'

function App() {

  const [language,setLanguage] = useState({ language: ENG });

  const onLanguageChange = language => {
    let newLang = {};
    switch(language){
      case 'eng':
        newLang = ENG;
        break;
      case 'sve':
        newLang = SVE;
        break;
      default:
        newLang = ENG;
        break;
    }
    setLanguage({ language: newLang })
  }

  return (
    <div className="App">
      <span>
          <button
            style={{backgroundColor:'white'}}
            onClick={() => onLanguageChange('eng')}>
              <img
                src={ukflag}
                width={30}
                height={30}
                />
          </button>
          <button
          style={{backgroundColor:'white'}}
            onClick={() => onLanguageChange('sve')}>
              <img
                src={sweflag}
                width={30}
                height={30}/>
            </button>
        </span>
        <LanguageContext.Provider value={language.language}>

          <BrowserRouter>
            <Routes>
              <Route path='/' element={<StartScreen/>} />
                <Route path='/GameBoard' element={<GameBoard width={13} height={11} />}/>
                <Route path='Settings' element={<Settings/>}/>
              <Route path='Tutorial' element={<Tutorial/>}/>
          </Routes>
          </BrowserRouter>
        </LanguageContext.Provider>
    </div>
  )
}

export default App
