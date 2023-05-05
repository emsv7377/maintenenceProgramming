import React from 'react';
import { useNavigate } from 'react-router-dom'
import GameBoard from '../components/GameBoard'
import pacman from '../assets/pacman.png'
import index from '../index.css?inline';
import Rat from '../components/Rat';
import Cheese from '../components/Cheese';

function StartScreen() {
   const navigate = useNavigate();

   function navGameBoard(event){
        event.preventDefault();
        navigate('GameBoard')
   }

   function navTutorial(event){
        event.preventDefault();
        navigate('Tutorial')
    }

    function navSettings(event){
        event.preventDefault();
        navigate('Settings')
    }

   return(
        <div className='body'>
            <h1>Welcome to Rat-Man</h1>
            <div className='row'
                style={{height:'20%',width:'20%'}}>
                        <Rat open={close}/><Cheese/>
                    </div>
                    <form onSubmit={navGameBoard}>
                        <button 
                        style={styles}
                            type='submit'>
                                Start new game
                        </button>
                    </form>
                    <form onSubmit={navTutorial}>
                        <button 
                        style={styles}
                            type='submit'>
                                Tutorial
                        </button>
                    </form>
                    <form onSubmit={navSettings}>
                        <button 
                        style={styles}
                            type='submit'>
                                Settings
                        </button>
                    </form>
            </div>
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

export default StartScreen;
