
/**
 * File: BackgroundMusic.jsx 
 * 
 * This file contains the logic for background music.  
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import { useState } from 'react';
import useSound from 'use-sound';
import gameSong from './audio/sneaky.mp3';
import btnPlay from '../assets/btnPlay.png';
import btnStop from '../assets/btnStop.png';

function BackgroundMusic(){
    const [isPlaying, setIsPlaying] = useState(false); // state for playing music      
    // 
    const [play, {pause}] = useSound(gameSong, {
            // Determines volume of the music  
            volume:0.1, 
            // When we call play() 
            onPlay: () => setIsPlaying(true),
            // When we call pause() 
            onend: () => setIsPlaying(false)
        })
    
    // Handles play/stop music   
    const togglePlay = () => {
        if(isPlaying){
            pause();
        } else {
            play();
        }
        setIsPlaying(!isPlaying)
    }

    // Renders play or stop icon based on state isPlaying 
    const renderPlayIcon = () => {
        // If isPlaying is true we want the stop button 
        if(isPlaying){
            return(
                <img
                    src={btnStop}
                    width={30}
                    height={30}/>
            )
        } else {
            // Else we want the play button 
            return (
                <img 
                    src={btnPlay}
                    width={30}
                    height={30}/>
            )
        }
    }
    
    return(
       <button 
            style={{
                backgroundColor:'white',
                }}
            onClick={() => togglePlay()}>
            {renderPlayIcon()}
       </button>
            
    )
}
export default BackgroundMusic;
//************
// END of file BackgroundMusic.jsx 
//************