import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import GameBoard from './components/GameBoard'
import StartScreen from './screens/StartScreen'
import Settings from './screens/Settings'
import Tutorial from './screens/Tutorial'
import Game from './screens/Game'

import { UK } from 'country-flag-icons/'
import { SWE } from 'country-flag-icons/'
import { ENG, SVE } from './components/Language'
import LanguageContext from './components/LanguageContext';


function App() {

  const [language,setLanguage] = useState({ language: ENG });

  const onLanguageChange = language => {
    let newLang = {};
    // 
    switch(language){
      case 'eng':
        newLang = 'ENG';
      case 'sve':
        newLang = 'SVE';
      default:
        newLang = SVE;
    }
    setLanguage({ language: newLang })
  }

  return (
    <div className="App">
      <span>
        {language.choosenLang.titleText}: 
        <UK
          className='flag us'
          onClick={() => onLanguageChange('eng')}/>
          <SWE
          className='flag swe'
          onClick={() => onLanguageChange('sve')}/>
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
