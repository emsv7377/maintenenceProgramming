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
import btnHelp from './assets/btnHelp.png'

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

  const btnStyle = {
    backgroundColor:'white',
  }

  function topMenu(){
    return(
      <div class='top-menu'>

      </div>
    )

  }

  /** Returns a top menu with language choices  */
  function topMenu(){
    return(
      <div className="top-menu">
        <span>
          <button
            style={btnStyle}
            onClick={() => onLanguageChange('eng')}>
              <img
                src={ukflag}
                width={30}
                height={30}
                />
          </button>
          <button
          style={btnStyle}
            onClick={() => onLanguageChange('sve')}>
              <img
                src={sweflag}
                width={30}
                height={30}/>
            </button>
          <button
            style={btnStyle}
            onClick={() => console.log('implement tutorial')}>
              <img
                src={btnHelp}
                width={30}
                height={30}
              />
            </button>
            </span>
            </div>  
    )
  }

  return (
    <div className="App">
      {topMenu()}
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
