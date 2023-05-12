
import { useState } from 'react'
import useSound from 'use-sound'
import gameSong from './audio/sneaky.mp3'

import btnPlay from '../assets/btnPlay.png'
import btnStop from '../assets/btnStop.png';

function BackgroundMusic(){
    const [isPlaying, setIsPlaying] = useState(false); // state for music playing     
    const [play, {pause}] = useSound(gameSong, { 
            volume:0.1, 
            onPlay: () => setIsPlaying(true),
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
        if(isPlaying){
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