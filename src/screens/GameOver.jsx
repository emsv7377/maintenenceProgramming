import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import LanguageContext from '../components/LanguageContext';

const GameOver = ({finalScore}) => {
   const navigate = useNavigate();
   const language = useContext(LanguageContext);
   const location = useLocation();

   console.log(location)

   return(
        <>
            <h1>{language.gameOver.titleText} </h1>
            { location.state.finalScore != null ? 
               <h2>
                  {language.yourPoints.titleText} {location.state.finalScore} {language.yourPoints.subText}
               </h2> : null }
           
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
