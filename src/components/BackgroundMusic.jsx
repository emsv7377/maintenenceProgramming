/**
 * File: BackgroundMusic.jsx 
 * 
 * This file contains the logic for background music for RatMan 
 * 
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */

import { useState } from 'react'
import useSound from 'use-sound'
import gameSong from './audio/sneaky.mp3'
import btnPlay from '../assets/btnPlay.png'
import btnStop from '../assets/btnStop.png';

function BackgroundMusic(){
    const [musicPlaying, setMusicPlaying] = useState(true); // state for music playing     
    const [play, {pause}] = useSound(gameSong, { 
            volume:0.1, 
            onPlay: () => setMusicPlaying(!musicPlaying),
            onend: () => setMusicPlaying(false)
        })
    
    // Handles play/stop music   
    const togglePlay = () => {
        if(musicPlaying){
            pause();
        } else {
            play();
        }
        setMusicPlaying(!musicPlaying)
    }

    // Renders play or stop icon based on state isPlaying 
    const renderPlayIcon = () => {
        if(musicPlaying){
            return(
                <img
                    src={btnStop}
                    width={30}
                    height={30}/>
            )
        }
        else {
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