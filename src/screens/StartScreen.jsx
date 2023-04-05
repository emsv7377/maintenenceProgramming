import React from 'react';
import { useNavigate } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import pacman from '../assets/pacman.png'

function StartScreen() {
   const navigate = useNavigate();

   function handleSubmit(event){
        event.preventDefault();
        navigate('GameBoard')
   }

   return(
        <div className='body'>
            <h1>Welcome to Rat-Man</h1>
                <h3> ~Add picture of Rat-Man here~ 
                </h3>
                    <img 
                        src={pacman} 
                        height={200} 
                        width={200} 
                        alt='Pacman' 
                        style={{marginBottom:40}}
                    />
                    <form onSubmit={handleSubmit}>
                        <button 
                            style={{ 
                                backgroundColor:'black', 
                                color:'white', 
                                fontSize:25, 
                                width: 280, 
                                height:70, 
                                borderRadius:15, 
                                alignSelf:'center',
                                fontWeight:'bold'
                            }} 
                            type='submit'>
                                Start new game
                        </button>
                    </form>
            </div>
    )
   }


export default StartScreen;
