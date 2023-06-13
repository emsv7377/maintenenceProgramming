/**
 * File: Gameover.jsx 
 * 
 * This file contains the gameover-page of the application
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import LanguageContext from '../components/LanguageContext';

const GameOver = ({finalScore}) => {
   // For navigating to other pages    
   const navigate = useNavigate();   
   // Language context                
   const language = useContext(LanguageContext);
   // Allows fetching user points from Game       
   const location = useLocation();                    

   return(
        <>
        {/* Header */}
            <h1>{language.gameOver.titleText} </h1>
            {/* Subheading with point score */}
            { location.state.finalScore != null ? 
               <h2>
                  {language.yourPoints.titleText} {location.state.finalScore} {language.yourPoints.subText}
               </h2> : null }
               {/* Buttons with navigation */}
                  <div className="cell" style={{ flexDirection:'column', alignItems:'center'}}>
                  <button 
                     onClick={() => navigate('/GameBoard')}
                     style={styles}
                     type='submit'> 
                     {language.tryAgainBtn.titleText} 
                  </button>
                  <button 
                     onClick={() => navigate('/')}
                     style={styles}
                     type='submit'> 
                     {language.toStartPageBtn.titleText}
                  </button>
                  </div>
         
         </>
    )
   }

   const styles = {
      backgroundColor:'black', 
      color:'white', 
      fontSize:22, 
      width: 280, 
      height:60, 
      margin:10,
      borderRadius:15, 
      alignSelf:'center',
      fontWeight:'bold'
  }

export default GameOver;
