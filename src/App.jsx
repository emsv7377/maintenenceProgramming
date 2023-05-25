import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'
import Settings from './screens/Settings'

import Game from './screens/Game'
import Tutorial from './screens/Tutorial'

import { ENG, SVE } from './components/Language'
import LanguageContext from './components/LanguageContext';

import sweflag from './assets/sweflag.png'
import ukflag from './assets/ukflag.png'
import btnHelp from './assets/btnHelp.png'
import BackgroundMusic from './components/BackgroundMusic';

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

  /** Returns a top menu with language choices  */
  function topMenu(){
    return(
      <div className="top-menu">
        <span>
          <button
            style={btnStyle}
            onClick={() => onLanguageChange('sve')}>
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
            onClick={() => console.log('navigate')}>
              <img
                src={btnHelp}
                width={30}
                height={30}
              />
            </button>
            <BackgroundMusic></BackgroundMusic>
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
              <Route path='/Tutorial' element={<Tutorial width={8} height={7}/>}/>
          </Routes>
          </BrowserRouter>
        </LanguageContext.Provider>
    </div>
  )
}

export default App
